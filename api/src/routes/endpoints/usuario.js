const app = require('express').Router();
const { getUsuario, postUsuario, putUsuario, deleteUsuario} = require('../../utils/users');

app.get('/',getUsuario)
app.post('/',postUsuario)
app.put('/:id',putUsuario)
app.delete('/:id',deleteUsuario)

module.exports = app;