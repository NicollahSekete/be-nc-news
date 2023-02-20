const express = require('express');
const app = express();
app.use(express.json())
const { fetchAllTopics } = require('./controllers/controllers')
const {handles404Errors, handles400Errors} = require('./handlesErrors')

app.get("/api/topics", fetchAllTopics)




app.use(handles404Errors)
app.use(handles400Errors)

module.exports = app