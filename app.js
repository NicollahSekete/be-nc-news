const express = require('express');
const app = express();
app.use(express.json());
const { fetchArticleByArticleId } = require('./controllers/fetchArticleByArticleIdController')
const { fetchAllTopics } = require('./controllers/fetchAllTopicsController')
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { updateArticle } = require('./controllers/updateArticleController')
const { fetchAllUsers } = require('./controllers/fetchAllUsersController')
const { addComment } = require('./controllers/addCommentController')
const { fetchCommentsByArticleId } = require('./controllers/fetchCommentsByArticleIdController')
const { getAllEndpoints } = require('./controllers/getAllEndpointsController')

const { handles500Errors, handles400Errors, handlesCustomErrors, handlePsql400Errors } = require('./handlesErrors')



app.get("/api", getAllEndpoints)
app.get("/api/topics", fetchAllTopics)
app.get("/api/articles", fetchAllArticles)
app.get("/api/users", fetchAllUsers)
app.get('/api/articles/:article_id', fetchArticleByArticleId)
app.get("/api/articles/:article_id/comments", fetchCommentsByArticleId)

app.patch("/api/articles/:article_id", updateArticle);
app.post("/api/articles/:article_id/comments", addComment)


app.all("*", (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)
app.use(handlesCustomErrors)
app.use(handlePsql400Errors)

module.exports = app