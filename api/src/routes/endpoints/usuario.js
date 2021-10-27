const app = require('express').Router();
const { getUsuario, postUsuario, putUsuario, deleteUsuario, getInicio} = require('../../utils/users');
app.route("/inicioS") 
    .get(getInicio)
app.get('/',getUsuario)
app.post('/',postUsuario)
app.put('/:id',putUsuario)
app.delete('/:id',deleteUsuario)

module.exports = app;