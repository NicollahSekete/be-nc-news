const { getArticleByArticleId } = require('../models/getArticleByArticleIdModel.js')

const fetchArticleByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    getArticleByArticleId(article_id).then((articles) => {
        res.status(200).send({ "article": articles });
    }).catch(err => {
        next(err)
    })
}



module.exports = { fetchArticleByArticleId }