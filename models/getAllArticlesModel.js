const db = require('../db/connection.js')

const getAllArticles = () => {
    return db.query(`
    SELECT * FROM articles
    ;
    `).then((result) => {
        const data = result.rows
        return data;
    });

}


module.exports = { getAllArticles }