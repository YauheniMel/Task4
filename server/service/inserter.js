module.exports = ({
  firstName,
  lastName,
  email,
  login,
  password,
  sex,
  state,
  registerDate,
  loginDate
}) => `INSERT INTO heroku_e2d696a94e7c439.users (
    firstName,
    lastName,
    email,
    login,
    password,
    sex,
    registerDate,
    state,
    loginDate
  ) VALUES (
    '${firstName}',
    '${lastName}',
    '${email}',
    '${login}',
    '${password}',
    '${sex}',
    '${registerDate}',
    '${state}',
    '${loginDate}'
)`;
