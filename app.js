const express = require('express');
const app = express();
app.use(express.json())
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { handles500Errors, handles400Errors, handle404nonExistentPath } = require('./handlesErrors')


app.get("/api/articles", fetchAllArticles)
app.use(handle404nonExistentPath)
app.use(handles500Errors)
app.use(handles400Errors)


module.exports = app