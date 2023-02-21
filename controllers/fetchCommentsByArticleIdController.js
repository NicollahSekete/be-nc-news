const { getCommentsByArticleId } = require('../models/CommentsByArticleIdModel.js')

const fetchCommentsByArticleId = (req, res, next) => {

    const { article_id } = req.params

    getCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({ "comments": comments });
    }).catch(err => {
        next(err)
    })
}




module.exports = { fetchCommentsByArticleId }