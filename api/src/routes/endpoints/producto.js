const app = require('express').Router();
const { getProductos, postProductos, putProductos, deleteProductos, getProductDetail} = require('../../utils/product');

app.get('/',getProductos)
app.get('/:id', getProductDetail)
app.post('/',postProductos)
app.put('/:id',putProductos)
app.delete('/:id',deleteProductos)

module.exports = app;