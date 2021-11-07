const app = require('express').Router();

const { getProductos, postProductos, putProductos, deleteProductos,getProducto,postCarrito} = require('../../utils/product');
const {UsuarioAutenticado} = require("../autorizacion/autorizacionPassport")
app.get('/',getProductos)
app.post('/',postProductos)
app.post("/carrito",UsuarioAutenticado,postCarrito) 
app.route("/:id")
    .get(getProducto)
    .put(putProductos)
    .delete(deleteProductos)

module.exports = app;