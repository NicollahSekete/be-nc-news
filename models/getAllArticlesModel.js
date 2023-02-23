const db = require('../db/connection.js')

const getAllArticles = (topic, sort_by, order, topicsExisting) => {

    const validTopics = topicsExisting
    const validOrderArguements = ['asc', 'desc']
    const validSortByArguements = ['title', 'topic', 'author', 'article_id', 'created_at', 'votes', 'article_img_url', 'comment_count' ]

    
    if(topic && !validTopics.includes(topic)){
        return Promise.reject('input not found')
    }

    if(sort_by && !validSortByArguements.includes(sort_by)){
        return Promise.reject('Invalid input')
    }

    if(order && !validOrderArguements.includes(order)){
        return Promise.reject('Invalid input')
    }

    let defaultQuery = `
    SELECT title, topic, author, article_id, created_at, votes, article_img_url, COUNT(article_id) AS comment_count
    FROM articles`
    const queryParams = [];
    

    if (topic) {
        defaultQuery += ' WHERE topic = $1 '
        queryParams.push(topic)
    }

    defaultQuery += ' GROUP BY article_id '


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