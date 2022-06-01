const bodyParser = require('body-parser');
const express = require('express');

const authRouter = require('./endpoints/authentication');

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
