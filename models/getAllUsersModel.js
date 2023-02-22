const db = require('../db/connection.js')

const getAllUsers = () => {
    return db.query(`
    SELECT * FROM users;
    `).then((result) => {
        const data = result.rows
        return data;
    });

}


module.exports = { getAllUsers }