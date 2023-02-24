const db = require('../db/connection.js')

const getAllArticles = (topic, sort_by, order, availableTopics) => {

    const topicsExisting = []

    availableTopics.forEach((element) => {
        slug = element.slug
        topicsExisting.push(slug)
    })

    const validTopics = topicsExisting

    const validOrderArguements = ['asc', 'desc']
    const validSortByArguements = ['title', 'topic', 'author', 'article_id', 'created_at', 'votes', 'article_img_url', 'comment_count']


    if (topic && !validTopics.includes(topic)) {
        return Promise.reject('input not found')
    }

    if (sort_by && !validSortByArguements.includes(sort_by)) {
        return Promise.reject('Invalid input')
    }

    if (order && !validOrderArguements.includes(order)) {
        return Promise.reject('Invalid input')
    }

    let defaultQuery = `SELECT articles.*, CAST(COUNT(comment_id) AS int) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id`
    const queryParams = [];


    if (topic) {
        defaultQuery += ' WHERE topic = $1 '
        queryParams.push(topic)
    }

    defaultQuery += ' GROUP BY articles.article_id '


    if (sort_by === undefined) {
        sort_by = 'created_at';
    }


    if (order === undefined) {
        order = 'desc'
    }

    defaultQuery += ` ORDER BY ${sort_by} ${order}`

    return db.query(defaultQuery, queryParams)
        .then(({ rows }) => {

            return rows;
        });

}



module.exports = { getAllArticles }