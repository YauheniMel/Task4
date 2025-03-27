const jwt = require('jsonwebtoken');

module.exports.jwtMiddleware = (req, res, next) => {
  try {
    const [, accessToken] = req.header('authorization').split(' ');

    jwt.verify(accessToken, process.env.JWT_SECRET);

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized!');
  }
};
