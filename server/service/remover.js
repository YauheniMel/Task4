module.exports.deleteMe = (id) => `DELETE FROM users WHERE id = ${id};`;
module.exports.deleteUsers = (ids) =>
  ids.map((id) => `DELETE FROM users WHERE id = ${id};`).join('\n');
