const express = require('express');
const app = express();

const { fetchArticleByArticleId } = require('./controllers/fetchArticleByArticleIdController')
const { fetchAllTopics } = require('./controllers/fetchAllTopicsController')
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { fetchCommentsByArticleId } = require('./controllers/fetchCommentsByArticleIdController')

const { handles500Errors, handles400Errors, handlesCustomErrors, handlePsql400Errors } = require('./handlesErrors')


app.get('/api/articles/:article_id', fetchArticleByArticleId)
app.get("/api/topics", fetchAllTopics)
app.get("/api/articles/:article_id/comments", fetchCommentsByArticleId)
app.get("/api/articles", fetchAllArticles)


app.all("*", (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)
app.use(handlesCustomErrors)
app.use(handlePsql400Errors)

module.exports = app