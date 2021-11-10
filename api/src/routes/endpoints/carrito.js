const { UsuarioAutenticado } = require("../autorizacion/autorizacionPassport")
const {postCarrito,cambiarCantidadDeCarrito,eliminarCarritoDeLaDB,obtenerCarrito} = require("../../utils/carrito")

const app=require("express").Router()



app.route("/")
    .get(UsuarioAutenticado,obtenerCarrito)
    .post(UsuarioAutenticado,postCarrito)
app.route("/:idCarrito")
    .put(UsuarioAutenticado,cambiarCantidadDeCarrito)
    .delete(UsuarioAutenticado,eliminarCarritoDeLaDB)
module.exports=app