const passport=require("passport")
const app = require('express').Router();
const { getUsuario, postUsuario, putUsuario, deleteUsuario,inicioDeSesion,pedidoCerrarSesion} = require('../../utils/users');

app.post("/inicioSesion",passport.authenticate("Inicio_de_Sesion",{
        successMessage:"Logeado",
        failureMessage:"error de Logueo"
    }),inicioDeSesion)
app.route("/cerrarSesion")
    .get(pedidoCerrarSesion)
 
app.route("/")
    .get(getUsuario)
    .post(postUsuario)

app.route("/:id")  
    .put(putUsuario)
    .delete(deleteUsuario)

function UsuarioAutenticado(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.json({error:"Usuario no Autenticado"})
}

module.exports = app;