const app = require('express').Router();
const {  postComentarios, getUserComentarios, getIdComentarios, getPuntajeComentarios, deleteComentarios } = require('../../utils/comment');

app.post('/', postComentarios)
//app.get('/', getComentarios)
app.get('/:id/', getIdComentarios)
app.get('/usuario/:idUsuario', getUserComentarios)
app.get('/puntaje/:idUsuario/', getPuntajeComentarios)
app.delete('/:idComentario', deleteComentarios)

module.exports = app;