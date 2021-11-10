const { Router } = require('express');
const router = Router();
const imagenes = require('./endpoints/imagen') 
const productos = require('./endpoints/producto')
const usuarios = require('./endpoints/usuario')
const comentarios = require('./endpoints/comentarios')
const checkout = require('./endpoints/checkout')
const carrito = require('./endpoints/carrito')

router.use('/imagenes', imagenes);
router.use('/productos', productos);
router.use('/usuarios', usuarios);
router.use('/comentarios', comentarios);
router.use('/checkout', checkout);
router.use('/carrito',carrito)
router.get('/', (req, res)=>{
    res.send('Ruta Principal (Home)')
})


module.exports = router;