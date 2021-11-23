const app = require('express').Router();
const {  newComment, getComments } = require('../../utils/comment');

app.post('/newComment', newComment)
app.get('/:id', getComments)
//app.get('/usuario/:idUsuario', getUserComentarios)
//app.get('/puntaje/:idUsuario/', getPuntajeComentarios)
//app.delete('/:idComentario', deleteComentarios)

module.exports = app;