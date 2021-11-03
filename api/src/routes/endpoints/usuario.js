const app = require('express').Router();
const passport=require("passport")
const { getUsuario, postUsuario, putUsuario, deleteUsuario,inicioDeSesion,pedidoCerrarSesion} = require('../../utils/users');

app.post("/inicioSesion",passport.authenticate("Inicio_de_Sesion"),inicioDeSesion)
app.route("/cerrarSesion")
    .get(pedidoCerrarSesion)

app.route("/")
    .get(getUsuario)
    .post(postUsuario)

app.route("/:id")  
    .put(putUsuario)
    .delete(deleteUsuario)


module.exports = app;