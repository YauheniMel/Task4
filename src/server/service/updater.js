module.exports.loginDate = (loginDate, id) => `
  UPDATE users SET loginDate = '${loginDate}'
  WHERE id = ${id};
`;

module.exports.state = (state, id) => `
  UPDATE users SET state = '${state}'
  WHERE id = ${id};
`;
