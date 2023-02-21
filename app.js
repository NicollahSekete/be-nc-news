const express = require('express');
const app = express();

const { fetchAllTopics } = require('./controllers/fetchAllTopicsController')
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { fetchArticleByArticleId } = require('./controllers/fetchArticleByArticleIdController')
const { handles500Errors, handles400Errors } = require('./handlesErrors')


app.get("/api/articles/article_id", fetchArticleByArticleId)
app.get("/api/articles", fetchAllArticles)
app.get("/api/topics", fetchAllTopics)


app.all("*", (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)

module.exports = app