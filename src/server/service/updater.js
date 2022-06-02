module.exports = (loginDate, id) => `
  UPDATE users SET loginDate = '${loginDate}'
  WHERE id = ${id};`;
