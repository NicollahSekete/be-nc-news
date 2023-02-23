const db = require('../db/connection.js')

const patchArticle = (article_id, inc_votes) => {
    
    if (!inc_votes) {
        return Promise.reject('Invalid input');
    }

    if(isNaN(inc_votes)){
        return Promise.reject('invalid id')
    }

    return db.query(`UPDATE articles
    SET votes=votes + $1 
    WHERE article_id=$2 
    RETURNING *;`,
        [inc_votes, article_id]
    ).then((result) => {
        const data = result.rows
        if (data && data.length === 0) {
            return Promise.reject('article not found')
        } else {
            return data[0];
        }
    })
};

module.exports = { patchArticle }