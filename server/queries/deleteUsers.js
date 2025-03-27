module.exports.deleteUsers = (ids) =>
  ids.map((id) => `DELETE FROM users WHERE id = ${id};`).join('\n');
