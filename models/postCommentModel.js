const db = require('../db/connection.js')

const postComment = (article_id, username, body) => {
    console.log('bodyyy' + body)


    if (username === "") {
        return Promise.reject('username is required')
    }

    if (body === "") {
        return Promise.reject('body is required')
    }

    return db.query(`
        INSERT INTO comments
        (article_id, author, body)
        VALUES
        ($1, $2, $3)
        RETURNING *;
        `, [article_id, username, body]
    ).then((result) => {
        const data = result.rows

        return data[0];
    });

}


module.exports = { postComment }
