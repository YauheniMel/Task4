module.exports.offline = (id) => `
  UPDATE users SET state = 'offline'
  WHERE id = ${id};
`;

module.exports.online = (id) => `
  UPDATE users SET state = 'online'
  WHERE id = ${id};
`;

module.exports.blockUsers = (ids) =>
  ids
    .map((id) => `UPDATE users SET state = 'blocked' WHERE id = ${id};`)
    .join('\n');

module.exports.unblockUsers = (ids) =>
  ids
    .map((id) => `UPDATE users SET state = 'offline' WHERE id = ${id};`)
    .join('\n');
