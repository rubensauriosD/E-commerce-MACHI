const { Router } = require('express');
const router = Router();
const imagenes = require('./endpoints/imagen')
const productos = require('./endpoints/producto')
const usuarios = require('./endpoints/usuario')

router.use('/imagenes', imagenes);
router.use('/productos', productos);
router.use('/usuarios', usuarios);

router.get('/', (req, res)=>{
    res.send('Ruta Principal (Home)')
})


module.exports = router;