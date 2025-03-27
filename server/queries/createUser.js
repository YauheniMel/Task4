module.exports.createUser = ({
  firstName,
  lastName,
  email,
  login,
  password,
  sex,
  state
}) => `INSERT INTO users (
    firstName,
    lastName,
    email,
    login,
    password,
    sex,
    state
  ) VALUES (
    '${firstName}',
    '${lastName}',
    '${email}',
    '${login}',
    '${password}',
    '${sex}',
    '${state}'
)`;
