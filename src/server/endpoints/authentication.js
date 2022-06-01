const { Router } = require('express');

const jwt = require('jsonwebtoken');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const timeout = (req, res, next) => {
  setTimeout(() => next(), 500);
};

const router = Router();

router.post('/api/login', timeout, (req, res) => {
  const { loginValue, passwordValue } = req.body;
  console.log(loginValue, passwordValue);

  if (true) {
    res.status(200).json({
      token,
    });
  }
});

module.exports = router;
