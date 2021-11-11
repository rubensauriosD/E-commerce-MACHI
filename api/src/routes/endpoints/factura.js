
const {UsuarioAutenticado,UsuarioAutenticadoAdmin} = require("../autorizacion/autorizacionPassport")
const {edicionDeFacturas,eliminarFactura,generarFacturas,obtenerFacturas,obtenerTodasLasFacturasAdmin}= require("../../utils/factura")
const app = require("express").Router()

app.route("/",UsuarioAutenticado)
    .get(obtenerFacturas)
    .post(generarFacturas)
app.route("/admin",UsuarioAutenticadoAdmin)
    .get(obtenerTodasLasFacturasAdmin)
app.route("/:id",UsuarioAutenticadoAdmin)
    .put(edicionDeFacturas)
    .delete(eliminarFactura)

module.exports= app