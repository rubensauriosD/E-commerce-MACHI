const passport=require("passport")
const app = require('express').Router();
const { getUsuario, postUsuario, putUsuario, deleteUsuario} = require('../../utils/users');

app.post("/inicioS",passport.authenticate("Inicio_de_Sesion",{
        successMessage:"Logeado",
        failureMessage:"error de Logueo"
    }))
app.get('/',getUsuario)
app.post('/',postUsuario)
app.put('/:id',putUsuario)
app.delete('/:id',deleteUsuario)

module.exports = app;