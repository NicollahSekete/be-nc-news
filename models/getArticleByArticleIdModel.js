const db = require('../db/connection.js')

const getArticleByArticleId = (article_id) => {
    const articleId = Number(article_id)

    if (isNaN(articleId)) {
        return Promise.reject('invalid id')
    } else {
        return db.query(`SELECT articles.*, CAST(COUNT(comment_id) AS int) AS comment_count  FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id`,[articleId]).then((result) => {
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