const app = require('express').Router();

const { getProductos, postProductos, putProductos, deleteProductos,getProducto} = require('../../utils/product');
const { UsuarioAutenticadoAdmin } = require('../autorizacion/autorizacionPassport');

app.get('/',getProductos)
app.post('/',UsuarioAutenticadoAdmin,postProductos)
app.route("/:id")
    .get(getProducto)
    .put(UsuarioAutenticadoAdmin,putProductos)
    .delete(UsuarioAutenticadoAdmin,deleteProductos)

module.exports = app;