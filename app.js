const express = require('express');
const app = express();

const { fetchAllArticles } = require('./controllers/fetchAllArticlesController')
const { handles500Errors, handles400Errors } = require('./handlesErrors')


app.get("/api/articles", fetchAllArticles)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)


module.exports = app