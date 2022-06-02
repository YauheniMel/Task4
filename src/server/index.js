const bodyParser = require('body-parser');
const express = require('express');

// connection.connect((err) => {
//   if (err) {
//     return console.error(`Ошибка: ${err.message}`);
//   }
//   return console.log('Подключение к серверу MySQL успешно установлено');
// });
// connection.end((err) => {
//   if (err) {
//     return console.log(`Ошибка: ${err.message}`);
//   }
//   return console.log('Подключение закрыто');
// });

const authRouter = require('./endpoints');

const port = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use(authRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
