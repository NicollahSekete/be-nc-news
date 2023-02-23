const db = require('../db/connection.js')

const getAllUsers = () => {
    return db.query(`
    SELECT * FROM users;
    `).then(({ rows }) => rows);

}


module.exports = { getAllUsers }