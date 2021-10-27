const app = require('express').Router();
const { getComments, deleteComments, putComments, postComments } = require('../../utils/comment');

app.get('/', getComments)
app.post('/', postComments)
app.put('/:id', putComments)
app.delete('/:id', deleteComments)

module.exports = app;