const { getAllArticles } = require('../models/getAllArticlesModel.js')

const fetchAllArticles = (req, res, next) => {

    getAllArticles().then((articles) => {
        res.status(200).send({ "articles": articles });
    }).catch(err => {
        next(err)
    })
}




module.exports = { fetchAllArticles }