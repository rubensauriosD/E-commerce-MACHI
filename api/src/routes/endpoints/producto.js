const app = require('express').Router();

const  UsuarioAutenticado  = require('../../passport/autorizacionUsuario/usuarioAuto');
const { getProductos, postProductos, putProductos, deleteProductos,getProducto} = require('../../utils/product');
 
app.route("/Admin")
    .get(UsuarioAutenticado,getProductos)
    .post(UsuarioAutenticado,postProductos)

app.get('/',getProductos)
app.post('/',postProductos)
app.route("/:id")
    .get(getProducto)
    .put(UsuarioAutenticado,putProductos)
    .delete(UsuarioAutenticado,deleteProductos)

module.exports = app;