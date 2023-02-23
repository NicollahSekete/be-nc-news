const { postComment } = require('../models/postCommentModel.js')
const { getArticleByArticleId } = require('../models/getArticleByArticleIdModel.js')

const addComment = (req, res, next) => {
    const { username, body } = req.body;
    const { article_id } = req.params;

    getArticleByArticleId(article_id)
        .then(() => {
            return postComment(article_id, username, body)
        }).then((comment) => {
            res.status(201).send({ comment })
        }).catch(err => {
            next(err)
        })


}



module.exports = { addComment }
