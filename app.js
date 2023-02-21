const express = require('express');
const app = express();

const { fetchAllTopics } = require('./controllers/fetchAllTopicsController')
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { fetchCommentsByArticleId } = require('./controllers/fetchCommentsByArticleIdController')
const { handles500Errors, handles400Errors } = require('./handlesErrors')


app.get("/api/articles", fetchAllArticles)
app.get("/api/topics", fetchAllTopics)
app.get("/api/articles/:article_id/comments", fetchCommentsByArticleId)


app.all("*", (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)

module.exports = app