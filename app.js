const express = require('express');
const app = express();
app.use(express.json())
const { fetchAllTopics } = require('./controllers/fetchAllTopicsController')
const { handles500Errors, handles400Errors } = require('./handlesErrors')

app.get("/api/topics", fetchAllTopics)


app.all("*", (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
})

app.use(handles500Errors)
app.use(handles400Errors)

module.exports = app