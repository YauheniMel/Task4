const { Router } = require('express');

const jwt = require('jsonwebtoken');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const uuid = require('uuid');

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

router.post('/api/register', timeout, (req, res) => {
  // const { loginValue, passwordValue } = req.body;
  console.log({
    ...req.body,
    id: uuid.v1(),
    meta: {
      registerDate: new Date(),
    },
  });

  // if (true) {
  //   res.status(200).json({
  //     token,
  //   });
  // }
  res.send(200);
});
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
