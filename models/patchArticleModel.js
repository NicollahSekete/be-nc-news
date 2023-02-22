const db = require('../db/connection.js')

const patchArticle = (article_id, inc_votes) => {
    return db.query(
        `UPDATE articles SET votes=votes + $1 WHERE article_id=$2 RETURNING *;`,
        [inc_votes, article_id]
    ).then((res) => res.rows).then((result) => {
        if (result.length === 0) {
            return Promise.reject('article not found')
        } else {
            return result[0];
        }
    });
}


module.exports = { patchArticle }