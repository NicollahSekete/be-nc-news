const db = require('../db/connection.js')

const getCommentsByArticleId = (article_id) => {

    const articleId = article_id

    return db.query(`
    SELECT * FROM comments
    WHERE article_id = ${articleId}
    ;

    `).then((result) => {
        const data = result.rows
        return data;
    });

}


module.exports = { getCommentsByArticleId }