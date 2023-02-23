const db = require('../db/connection.js')

const getAllArticles = (topic, sort_by, order) => {

    let defaultQuery = `
    SELECT title, topic, author, article_id, created_at, votes, article_img_url, COUNT(article_id) AS comment_count
    FROM articles
    GROUP BY article_id
    ORDER BY created_at DESC;`

    const validOrderArguements = ['asc', 'desc', 'ASC', 'DESC']

    const validSortArguements = ['title', 'author', 'article_id', 'created_at', 'votes', 'article_img_url', 'comment_count']


    return db.query(defaultQuery).then(result => {

        const data = result.rows
        return data;
    })

}





module.exports = { getAllArticles }