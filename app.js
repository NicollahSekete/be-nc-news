const express = require('express');
const app = express();

const { fetchArticleByArticleId } = require('./controllers/fetchArticleByArticleIdController')


app.get("/api/articles/article_id", fetchArticleByArticleId)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})




module.exports = app