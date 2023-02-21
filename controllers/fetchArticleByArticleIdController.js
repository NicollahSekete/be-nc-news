const { getArticleByArticleId } = require('../models/getArticleByArticleIdModel.js')

const fetchArticleByArticleId = (req, res, next) => {

    getArticleByArticleId().then((articles) => {
        res.status(200).send({ "articles": articles });
    }).catch(err => {
        next(err)
    })
}




module.exports = { fetchArticleByArticleId }