const db = require('../db/connection.js')

const getCommentsByArticleId = (article_id) => {

    const articleId = article_id

    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC
    `, [articleId]).then((result) => {
        const data = result.rows

        if (data && data.length === 0) {
            return Promise.reject('article not found')
        } else {
            return data;
        }
    });

}


module.exports = { getCommentsByArticleId }