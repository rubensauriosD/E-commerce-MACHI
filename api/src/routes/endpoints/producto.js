const app = require('express').Router();

const { getProductos, postProductos, putProductos, deleteProductos,getProducto} = require('../../utils/product');

app.get('/',getProductos)
app.post('/',postProductos)
app.route("/:id")
    .get(getProducto)
    .put(putProductos)
    .delete(deleteProductos)

module.exports = app;