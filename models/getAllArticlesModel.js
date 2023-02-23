const db = require('../db/connection.js')

const getAllArticles = () => {
    return db.query(`
    SELECT title, topic, author, article_id, created_at, votes, article_img_url, COUNT(article_id) AS comment_count
    FROM articles
    GROUP BY article_id
    ORDER BY created_at DESC;

    `).then((result) => {
        const data = result.rows
        return data;
    });

}


module.exports = { getAllArticles }