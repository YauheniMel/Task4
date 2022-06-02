const { Router } = require('express');
// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const inserter = require('./service/inserter');
const updater = require('./service/updater');

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

    if (!users[0]) {
      return res.status(401).send('Incorrect login info');
    }

    const targetUser = users.find((user) => user.login === login && token);

    return res.status(200).json({
      users: db(users),
      targetUser,
    });
  });
});

router.post('/api/login', timeout, (req, res) => {
  const { loginValue, passwordValue } = req.body;

  try {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      const targetUser = users.find(
        (user) => user.login === loginValue && user.password === passwordValue,
      );
      if (!targetUser) {
        throw new Error('Incorrect login info');
      }

      targetUser.loginDate = new Date();
      connection.query(updater(new Date(), targetUser.id), (error) => {
        if (error) throw new Error(error);
      });

      return res.status(200).json({
        token,
        targetUser,
        users: db(users),
      });
    });
  } catch (err) {
    res.status(400).send(`Login failed: ${err.message}`);
  }
});

router.post('/api/register', timeout, (req, res) => {
  try {
    connection.query(
      inserter({
        ...req.body,
        registerDate: new Date(),
        loginDate: new Date(),
      }),
      (error) => {
        if (error) throw new Error(error);

        connection.query('SELECT * FROM users', (err, results) => {
          if (err) throw new Error(err);

          const users = Object.values(JSON.parse(JSON.stringify(results)));

          const targetUser = users.find(
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
  } catch (err) {
    res.status(400).send(`Register failed: ${err.message}`);
  }
});

module.exports = router;
