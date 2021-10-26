const app = require('express').Router();
const { getProductos, postProductos, putProductos, deleteProductos} = require('../../utils/product');

app.get('/',getProductos)
app.post('/',postProductos)
app.put('/:id',putProductos)
app.delete('/:id',deleteProductos)

module.exports = app;