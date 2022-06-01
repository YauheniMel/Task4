module.exports = ({
  firstName,
  lastName,
  email,
  login,
  password,
  sex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerDate,
}) => `INSERT INTO users (
    firstName,
    lastName,
    email,
    login,
    password,
    sex,
    registerDate
  ) VALUES (
    '${firstName}',
    '${lastName}',
    '${email}',
    '${login}',
    '${password}',
    '${sex}',
    '2022-05-01T12:34:08.051Z'
)`;
