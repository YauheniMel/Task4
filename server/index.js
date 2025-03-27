const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const createUsersTableQuery = require('./queries/createUsersTable');
const router = require('./controllers');
const connection = require('./DB');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true
  })
);

app.use(bodyParser.json());

connection.connect(async () => {
  try {
    await connection.promise().query(createUsersTableQuery());
  } catch (error) {
    console.log('DB connection error: ' + error);
  }
});

app.use(router);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server was running on port ${port}`);
});
