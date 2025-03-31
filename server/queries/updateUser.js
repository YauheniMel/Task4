module.exports.offline = (id) => `
  UPDATE users SET state = 'offline'
  WHERE id = ${id};
`;

module.exports.online = (id) => `
  UPDATE users SET state = 'online'
  WHERE id = ${id};
`;

module.exports.blockUsers = (ids) => `
    UPDATE users SET state = 'blocked' 
    WHERE id IN (${ids});
`;

module.exports.unblockUsers = (ids) => `
    UPDATE users SET state = 'offline' 
    WHERE id IN (${ids});
`;
