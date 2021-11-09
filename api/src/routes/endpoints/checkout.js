const app = require('express').Router()

const {checkoutPase} = require("../../utils/checkout")
const {UsuarioAutenticado} = require("../autorizacion/autorizacionPassport")

app.post('/',UsuarioAutenticado,checkoutPase)

module.exports = app;
        //  [
        //   {
        //     //category_id: req.body.id, // 1235641348
        //     title: req.body.title, // nombre del producto
        //     unit_price: parseInt(req.body.unit_price),
        //     quantity: parseInt(req.body.quantity), //esto hay q crearlo
        //     currency_id: 'ARS'
        //   }
        // ], 