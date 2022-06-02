module.exports.loginDate = (loginDate, id) => `
  UPDATE users SET loginDate = '${loginDate}'
  WHERE id = ${id};
`;

module.exports.blockMe = (id) => `
  UPDATE users SET state = 'blocked'
  WHERE id = ${id};
`;

module.exports.blockUsers = (ids) => ids
  .map((id) => `UPDATE users SET state = 'blocked' WHERE id = ${id};`)
  .join('\n');

module.exports.unblockUsers = (ids) => ids
  .map((id) => `UPDATE users SET state = 'active' WHERE id = ${id};`)
  .join('\n');
