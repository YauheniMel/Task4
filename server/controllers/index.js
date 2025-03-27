const {
  online,
  offline,
  unblockUsers,
  blockUsers
} = require('../queries/updateUser');
const { createUser } = require('../queries/createUser');
const { Router } = require('express');
const connection = require('../DB');
const jwt = require('jsonwebtoken');
const { find, findAll } = require('../queries/find');
const { jwtMiddleware } = require('../middleware/jwt.middleware');
const { deleteUsers } = require('../queries/deleteUsers');

const router = Router();

router.put('/api/login', async (req, res) => {
  let login = req.body.login;
  let password = req.body.password;

  const authorizationHeader = req.header('authorization');

  if (!login && !password && authorizationHeader) {
    const [, accessToken] = authorizationHeader.split(' ');

    const payload = jwt.decode(accessToken, process.env.JWT_SECRET);

    login = payload.login;
    password = payload.password;
  }

  try {
    const [[user]] = await connection.promise().query(find(login, password));

    if (!user) {
      return res.status(401).send('Unauthorized!');
    }

    if (user.state === 'blocked') {
      return res.status(403).send('User was blocked!');
    }

    await connection.promise().query(online(user.id));

    const accessToken = jwt.sign(
      { id: user.id, login: user.login, password: user.password },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    return res.status(200).send({
      accessToken,
      user
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/api/signup', async (req, res) => {
  try {
    await connection.promise().query(createUser(req.body));

    return res.status(200).send('User was created successfully!');
  } catch (err) {
    return res.status(400).send(`Logout failed: ${err.message}`);
  }
});

router.put('/api/logout', jwtMiddleware, async (req, res) => {
  const [, accessToken] = req.header('authorization').split(' ');

  try {
    const { id } = jwt.decode(accessToken, process.env.JWT_SECRET);

    await connection.promise().query(offline(id));

    return res.status(200).send('Bye-Bye!');
  } catch (err) {
    return res.status(400).send(`Logout failed: ${err.message}`);
  }
});

router.get('/api/users', jwtMiddleware, async (req, res) => {
  const [, accessToken] = req.header('authorization').split(' ');

  try {
    const { id } = jwt.decode(accessToken, process.env.JWT_SECRET);

    const [users] = await connection.promise().query(findAll(id));

    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/api/block', jwtMiddleware, async (req, res) => {
  const ids = req.body;

  try {
    await connection.promise().query(blockUsers(ids));

    return res.status(200).send(`Success!!!`);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/api/unblock', jwtMiddleware, async (req, res) => {
  const ids = req.body;

  try {
    await connection.promise().query(unblockUsers(ids));

    return res.status(200).send(`Success!!!`);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/api/delete', jwtMiddleware, async (req, res) => {
  const ids = req.body;

  try {
    await connection.promise().query(deleteUsers(ids));

    return res.status(200).send(`Success!!!`);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
