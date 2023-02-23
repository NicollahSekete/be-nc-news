const handles500Errors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(500).send({ msg: err.msg })
    } else {
        next(err)
    }
}

const handles400Errors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(400).send({ msg: err.msg })
    } else {
        next(err)
    }
}

const handlePsql400Errors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request" });
    } else if (err.code === "23503") {
        res.status(404).send({ msg: "Not found" });
    } else {
        next(err);
    }
};

const handlesCustomErrors = (err, req, res, next) => {
    if (err === 'article not found') {
        res.status(404).send({ msg: 'Not Found' })
    } else if (err === 'invalid id') {
        res.status(400).send({ msg: 'Bad Request' })
    } else if (err === 'username is required') {
        res.status(400).send({ msg: 'Bad Request' })
    } else if (err === 'body is required') {
        res.status(400).send({ msg: 'Bad Request' })
    } else {
        next(err)
    }
}

module.exports = { handles500Errors, handles400Errors, handlesCustomErrors, handlePsql400Errors }
