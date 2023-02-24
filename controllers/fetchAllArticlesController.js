const { getAllArticles } = require('../models/getAllArticlesModel.js')
const { getAllTopics } = require('../models/getAllTopicsModel.js')


const fetchAllArticles = (req, res, next) => {
    const { topic, sort_by, order } = req.query;

    getAllTopics()
        .then((availableTopics) => {
            return getAllArticles(topic, sort_by, order, availableTopics)
        }).then((articles) => {
            res.status(200).send({ "articles": articles })
        }).catch(err => {
            next(err)
        })

}




module.exports = { fetchAllArticles }