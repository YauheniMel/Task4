module.exports.loginDate = (loginDate, id) => `
  UPDATE heroku_e2d696a94e7c439.users SET loginDate = '${loginDate}'
  WHERE id = ${id};
`;

module.exports.offline = (id) => `
  UPDATE heroku_e2d696a94e7c439.users SET state = 'offline'
  WHERE id = ${id};
`;

module.exports.online = (id) => `
  UPDATE heroku_e2d696a94e7c439.users SET state = 'online'
  WHERE id = ${id};
`;

module.exports.blockMe = (id) => `
  UPDATE heroku_e2d696a94e7c439.users SET state = 'blocked'
  WHERE id = ${id};
`;

module.exports.blockUsers = (ids) =>
  ids
    .map((id) => `UPDATE heroku_e2d696a94e7c439.users SET state = 'blocked' WHERE id = ${id};`)
    .join('\n');

module.exports.unblockUsers = (ids) =>
  ids
    .map((id) => `UPDATE heroku_e2d696a94e7c439.users SET state = 'active' WHERE id = ${id};`)
    .join('\n');
