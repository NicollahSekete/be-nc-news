const endpoints = require('../endpoints.json');



const getAllEndpoints = (req, res, next) => {
    res.status(200).send({ api: endpoints });
}

module.exports = { getAllEndpoints }