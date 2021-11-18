const app = require('express').Router();
const { getImagenes, postImagenes, putImagenes, deleteImagenes} = require('../../utils/image');
const {UsuarioAutenticado,UsuarioAutenticadoAdmin} = require("../autorizacion/autorizacionPassport")
app.get('/',getImagenes)
app.post('/',UsuarioAutenticadoAdmin,postImagenes)
app.delete('/:id',UsuarioAutenticadoAdmin,deleteImagenes)

module.exports = app;