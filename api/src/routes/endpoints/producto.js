const app = require('express').Router();

const { getProductos, postProductos, putProductos, deleteProductos,getProducto} = require('../../utils/product');
const { UsuarioAutenticadoAdmin } = require('../autorizacion/autorizacionPassport');

app.get('/',getProductos)
app.post('/',UsuarioAutenticadoAdmin,postProductos) 
app.route("/:id")
    .get(getProducto)
    .put(putProductos)
    .delete(deleteProductos)

module.exports = app;