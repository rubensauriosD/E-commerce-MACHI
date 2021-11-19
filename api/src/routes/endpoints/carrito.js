const { UsuarioAutenticado } = require("../autorizacion/autorizacionPassport")
const {postCarrito,cambiarCantidadDeCarrito,eliminarCarritoDeLaDB,obtenerCarrito,eliminarCarritoUsuario} = require("../../utils/carrito")

const app=require("express").Router()



app.route("/")
    .get(UsuarioAutenticado,obtenerCarrito)
    .post(UsuarioAutenticado,postCarrito)
    .delete(UsuarioAutenticado,eliminarCarritoUsuario)
app.route("/:idCarrito")
    .put(UsuarioAutenticado,cambiarCantidadDeCarrito)
    .delete(UsuarioAutenticado,eliminarCarritoDeLaDB)
module.exports=app