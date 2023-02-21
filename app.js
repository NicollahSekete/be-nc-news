const express = require('express');
const app = express();
app.use(express.json())
const { fetchAllTopics } = require('./controllers/controllers')
const { handles500Errors, handles400Errors, handle404nonExistentPath } = require('./handlesErrors')

app.get("/api/topics", fetchAllTopics)

app.use(handle404nonExistentPath)
app.use(handles500Errors)
app.use(handles400Errors)

module.exports = app