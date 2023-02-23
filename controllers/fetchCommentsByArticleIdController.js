const { getCommentsByArticleId } = require('../models/CommentsByArticleIdModel.js')
const { getArticleByArticleId } = require('../models/getArticleByArticleIdModel.js')

const fetchCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    getArticleByArticleId(article_id)
      .then(() => {
        return getCommentsByArticleId(article_id)
      })
      .then((comments) => {
        res.status(200).send({"comments": comments });
      })
      .catch(next);
}


module.exports = { fetchCommentsByArticleId }