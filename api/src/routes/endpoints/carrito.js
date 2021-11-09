const { UsuarioAutenticado } = require("../autorizacion/autorizacionPassport")
const {postCarrito} = require("../../utils/carrito")
 
const app=require("express").Router()
 


app.route("/")
    .post(UsuarioAutenticado,postCarrito)

module.exports=app