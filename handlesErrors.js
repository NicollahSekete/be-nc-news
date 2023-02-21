const handle404nonExistentPath = (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
}

const handles500Errors = (err, req, res, next) => {
    if (err.status && err.msg) {
        response.status(404).send({ msg: err.msg })
    } else {
        next(err)
    }
}

const handles400Errors = (err, req, res, next) => {
    if (err.status && err.msg) {
        response.status(400).send({ msg: err.msg })
    } else {
        next(err)
    }
}






module.exports = { handles500Errors, handles400Errors, handle404nonExistentPath }