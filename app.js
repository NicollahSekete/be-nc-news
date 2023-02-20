const express = require('express');
const app = express();
app.use(express.json())
const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')


app.get("/api/articles", fetchAllArticles)




module.exports = app