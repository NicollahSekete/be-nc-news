const db = require('../db/connection.js')

const getArticleByArticleId = (article_id) => {
    const articleId = Number(article_id)

    if (isNaN(articleId)) {
        return Promise.reject('invalid id')
    } else {
        return db.query(`
        SELECT * FROM articles
       WHERE article_id = $1
        `,[articleId]).then((result) => {
            const data = result.rows
            if (data && data.length === 0) {
                return Promise.reject('article not found')
            } else {
                return data[0];
            }
        });
    }
}


module.exports = { getArticleByArticleId }