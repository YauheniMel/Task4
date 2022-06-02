module.exports = ({
  firstName,
  lastName,
  email,
  login,
  password,
  sex,
  state,
  registerDate,
  loginDate,
}) => `INSERT INTO users (
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
