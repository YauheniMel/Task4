const { Router } = require('express');
// eslint-disable-next-line import/order
const inserter = require('../service/inserter');

const jwt = require('jsonwebtoken');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const timeout = (req, res, next) => {
  setTimeout(() => next(), 500);
};

const mysql = require('mysql');
const db = require('../data/users');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb',
  password: 'melnik123',
});

const router = Router();

router.post('/api/login', timeout, (req, res) => {
  const { loginValue, passwordValue } = req.body;

  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw new Error(err);

    const users = Object.values(JSON.parse(JSON.stringify(results)));

    const targetUser = users.find(
      (user) => user.login === loginValue && user.password === passwordValue,
    );
    if (!targetUser) {
      return res.status(401).send('Incorrect login info');
    }
    return res.status(200).json({
      token,
      targetUser,
      users: db(users),
    });
  });
});

router.post('/api/register', timeout, (req, res) => {
  try {
    connection.query(
      inserter({
        ...req.body,
        registerDate: new Date(),
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
