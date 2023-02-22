const { getAllUsers } = require('../models/getAllUsersModel.js')


const fetchAllUsers = (req, res, next) => {

    getAllUsers().then((users) => {

        res.status(200).send({ "users": users });
    }).catch(err => {
        next(err)
    })

}




module.exports = { fetchAllUsers }