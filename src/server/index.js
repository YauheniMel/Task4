const bodyParser = require('body-parser');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { Router } = require('express');
const cors = require('cors');
// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const moment = require('moment');
const path = require('path');
const inserter = require('./service/inserter');
const updater = require('./service/updater');
const remover = require('./service/remover');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.join('update');
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());

app.use(express.static(path.join(__dirname, '../', '../', 'public')));

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
  multipleStatements: true,
});

const router = Router();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '../', 'public', 'index.html'));
});

router.post('/api/users', timeout, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { login, token } = req.body;
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw new Error(err);

    let users = Object.values(JSON.parse(JSON.stringify(results)));

    const targetUser = users.find((user) => user.login === login && token);
    users = users.filter((user) => user !== targetUser);
    return res.status(200).json({
      users: db(users),
      targetUser,
    });
  });
});

router.put('/api/login', timeout, async (req, res) => {
  const { loginValue, passwordValue } = req.body;

  try {
    // eslint-disable-next-line consistent-return
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      const targetUser = users.find(
        (user) => user.login === loginValue && user.password === passwordValue,
      );
      if (!targetUser) {
        return res.status(400).send('Login incorrect!');
      }

      if (targetUser.state === 'blocked') {
        return res.status(400).send('This user was blocked!');
      }

      targetUser.loginDate = moment().format();
      targetUser.state = 'online';

      connection.query(
        `${updater.loginDate(
          targetUser.loginDate,
          targetUser.id,
        )} ${updater.online(targetUser.id)}`,
        (error) => {
          if (error) throw new Error(error);
          connection.query('SELECT * FROM users', (e, r) => {
            if (e) throw new Error(e);

            const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

            io.to('update').emit('time', JSON.stringify(newUsers));
          });
          return res.status(200).json({
            token,
            targetUser,
            users: db(users),
          });
        },
      );
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// eslint-disable-next-line consistent-return
router.put('/api/block', timeout, (req, res) => {
  let command;
  if (Array.isArray(req.body)) {
    command = updater.blockUsers(req.body);
  } else {
    const { id } = req.body;
    command = updater.blockMe(id);
  }

  try {
    connection.query(command, (error) => {
      if (error) throw new Error(error);

      connection.query('SELECT * FROM users', (e, r) => {
        if (e) throw new Error(e);

        const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

        io.to('update').emit('time', JSON.stringify(newUsers));
      });
    });

    return res.status(200).send('Blocked successfully!');
  } catch (err) {
    res.status(400).send(`Blocked failed: ${err.message}`);
  }
});

// eslint-disable-next-line consistent-return
router.put('/api/unblock', timeout, (req, res) => {
  const command = updater.unblockUsers(req.body);

  if (!req.body.length) {
    return res.status(200).send('Unblocked successfully!');
  }

  try {
    connection.query(command, (error) => {
      if (error) throw new Error(error);

      connection.query('SELECT * FROM users', (e, r) => {
        if (e) throw new Error(e);

        const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

        io.to('update').emit('time', JSON.stringify(newUsers));
      });
    });

    return res.status(200).send('Unblocked successfully!');
  } catch (err) {
    res.status(400).send(`Unblocked failed: ${err.message}`);
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
          registerDate: moment().format(),
          loginDate: moment().format(),
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

            io.to('update').emit('time', JSON.stringify(newUsers));

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

router.delete('/api/del/:ids', timeout, (req, res) => {
  let command;
  const ids = req.params.ids.split(',');

  if (ids.length > 1) {
    command = remover.deleteUsers(ids);
  } else {
    command = remover.deleteMe(ids[0]);
  }

  try {
    connection.query(command, (err) => {
      if (err) throw new Error(err);
      connection.query('SELECT * FROM users', (e, r) => {
        if (e) throw new Error(e);

        const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

        io.to('update').emit('time', JSON.stringify(newUsers));
      });
      return res.status(200).send('Deleted successfully!');
    });
  } catch (err) {
    res.status(400).send(`Deleted failed: ${err.message}`);
  }
});

router.post('/api/logout', timeout, (req, res) => {
  const { id } = req.body;
  const { status } = req.body;

  console.log(status);
  let command;
  if (status !== 'blocked') {
    command = updater.offline(id);
  } else {
    command = updater.blockMe(id);
  }

  try {
    connection.query(command, (err) => {
      if (err) throw new Error(err);
      connection.query('SELECT * FROM users', (e, r) => {
        if (e) throw new Error(e);

        const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

        io.to('update').emit('time', JSON.stringify(newUsers));
      });
      return res.status(200).send('Bye-Bye!');
    });
  } catch (err) {
    res.status(400).send(`Logout failed: ${err.message}`);
  }
});

app.use(bodyParser.json());

app.use(router);

server.listen(port, () => {
  console.log(`running on port ${port}`);
});
