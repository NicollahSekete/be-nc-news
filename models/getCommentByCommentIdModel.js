const db = require('../db/connection.js')

const getCommentByCommentId = (comment_id) => {

    const commentId = comment_id

    return db.query(`
    SELECT * FROM comments
    WHERE comment_id = $1
    `, [commentId]).then(({ rows }) => {
        if (rows.length) {
          return rows[0];
        } else {
            return Promise.reject('input not found')
        }
      })

}


module.exports = { getCommentByCommentId }