const { getAllTopics } = require('../models/getAllTopicsModel.js')



const fetchAllTopics = (req, res, next) => {

    getAllTopics().then((topics) => {

        res.status(200).send({ topics });
    }).catch(err => {
        next(err)
    })

}




module.exports = { fetchAllTopics }