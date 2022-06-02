const { Router } = require('express');
// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const inserter = require('./service/inserter');
const updater = require('./service/updater');
const remover = require('./service/remover');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const timeout = (req, res, next) => {
  setTimeout(() => next(), 500);
};

const db = require('./data/users');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb',
  password: 'melnik123',
});

const router = Router();

router.post('/api/users', timeout, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { login, token } = req.body;
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw new Error(err);

    const users = Object.values(JSON.parse(JSON.stringify(results)));

    const targetUser = users.find((user) => user.login === login && token);

    return res.status(200).json({
      users: db(users),
      targetUser,
    });
  });
});

router.put('/api/login', timeout, async (req, res) => {
  const { loginValue, passwordValue } = req.body;

  try {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      const targetUser = users.find(
        (user) => user.login === loginValue && user.password === passwordValue,
      );
      if (!targetUser) {
        return res.status(400).send('Login failed');
      }

      if (targetUser.state === 'blocked') {
        return res.status(400).send('This user was blocked!');
      }

      targetUser.loginDate = new Date();
      connection.query(
        updater.loginDate(new Date(), targetUser.id),
        (error) => {
          if (error) throw new Error(error);
        },
      );

      return res.status(200).json({
        token,
        targetUser,
        users: db(users),
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/api/update/:id', timeout, (req, res) => {
  const { state } = req.body;
  const { id } = req.params;

  try {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      const targetUser = users.find((user) => +user.id === +id);
      if (!targetUser) {
        throw new Error('Update process failed');
      }

      connection.query(updater.state(state, targetUser.id), (error) => {
        if (error) throw new Error(error);
      });

      return res.status(200).send('You are blocked!');
    });
  } catch (err) {
    res.status(400).send(`You aren't blocked: ${err.message}`);
  }
});

router.post('/api/register', timeout, (req, res) => {
  try {
    // eslint-disable-next-line consistent-return
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      if (users.find((user) => user.login === req.body.login)) {
        return res.status(400).send('This login already exists:(');
      }

      connection.query(
        inserter({
          ...req.body,
          registerDate: new Date(),
          loginDate: new Date(),
        }),
        (error) => {
          if (error) throw new Error(error);

          connection.query('SELECT * FROM users', (e, result) => {
            if (e) throw new Error(e);

            const newUsers = Object.values(JSON.parse(JSON.stringify(result)));

            const targetUser = newUsers.find(
              (user) => user.login === req.body.login
                && user.password === req.body.password,
            );

            return res.status(200).json({
              token,
              targetUser,
              users: db(users),
            });
          });
        },
      );
    });
  } catch (err) {
    res.status(400).send(`Register failed: ${err.message}`);
  }

  return [];
});

router.delete('/api/del/:id', timeout, (req, res) => {
  const { id } = req.params;

  try {
    connection.query(remover.deleteMe(id), (err) => {
      if (err) throw new Error(err);

      return res.status(200).send('Your account was deleted!');
    });
  } catch (err) {
    res.status(400).send(`You aren't deleted: ${err.message}`);
  }
});

module.exports = router;
