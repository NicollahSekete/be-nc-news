const { getAllArticles } = require('../models/getAllArticlesModel.js')

const fetchAllArticles = (req, res, next) => {
    const { topic, sort_by, order } = req.query;

    getAllArticles(topic, sort_by, order).then((articles) => {
        res.status(200).send({ "articles": articles });
    }).catch(err => {
        next(err)
    })
}




module.exports = { fetchAllArticles }