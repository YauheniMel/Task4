const jwt = require('jsonwebtoken');
const {
  checkIfLeftLessFiveMinutes
} = require('../utils/checkIfLeftLessFiveMinutes');

module.exports.jwtMiddleware = (req, res, next) => {
  try {
    const [, accessToken] = req.header('authorization').split(' ');

    const { exp, id, login, password } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    if (checkIfLeftLessFiveMinutes(exp)) {
      const accessToken = jwt.sign(
        { id, login, password },
        process.env.JWT_SECRET,
        { expiresIn: 3600 }
      );

      res.locals.accessToken = accessToken;
    }

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized!');
  }
};
