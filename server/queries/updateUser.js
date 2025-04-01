module.exports.offline = (id) => `
  UPDATE users SET state = 'offline',
  updatedAt = updatedAt,
  createdAt = createdAt
  WHERE (id = ${id} AND state != 'blocked');
`;

module.exports.online = (id) => `
  UPDATE users SET state = 'online',
  createdAt = createdAt
  WHERE id = ${id};
`;

module.exports.blockUsers = (ids) => `
    UPDATE users SET state = 'blocked',
    updatedAt = updatedAt,
    createdAt = createdAt
    WHERE id IN (${ids});
`;

module.exports.unblockUsers = (ids) => `
    UPDATE users SET state = 'offline',
    updatedAt = updatedAt,
    createdAt = createdAt
    WHERE id IN (${ids});
`;
