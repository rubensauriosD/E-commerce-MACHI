const { UsuarioAutenticado } = require("../autorizacion/autorizacionPassport")

const app = require("express").Router()

app.route("/",UsuarioAutenticado)
    .get()
    .post()
    .delete()


module.exports=app