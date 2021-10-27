const app = require('express').Router();
const { getImagenes, postImagenes, putImagenes, deleteImagenes} = require('../../utils/image');

app.get('/',getImagenes)
app.post('/',postImagenes)
// app.put('/:id',putImagenes)
app.get('/:id',deleteImagenes)

module.exports = app;