module.exports.find = (login, password) => `
    SELECT * FROM users
    WHERE (login = '${login}' AND password = '${password}')
`;

module.exports.findAll = (id) => `    
    SELECT * FROM users
    WHERE NOT id = ${id}
`;
