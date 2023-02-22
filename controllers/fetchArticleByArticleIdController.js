const { getArticleByArticleId } = require('../models/getArticleByArticleIdModel.js')

const fetchArticleByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    getArticleByArticleId(article_id).then((article) => {
        res.status(200).send({ "article": article });
    }).catch(err => {
        next(err)
    })
}



module.exports = { fetchArticleByArticleId }