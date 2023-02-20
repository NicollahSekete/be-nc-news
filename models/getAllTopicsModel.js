const db = require('../db/connection.js')

const getAllTopics = () => {
    return db.query(`
    SELECT * FROM topics
    ORDER BY slug ASC;
    ;
    `).then((result) => {
        const data = result.rows
        if (!data) {
            return Promise.reject('table not found')
        }
        return data;
    });

}


module.exports = { getAllTopics }