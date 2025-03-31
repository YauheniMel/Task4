module.exports.deleteUsers = (ids) => `
    DELETE FROM users 
    WHERE id IN (${ids})
;`;
