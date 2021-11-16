const { Factura, Producto } = require("../db")

const obtenerFacturas=async(req,res)=>{
    const usuario=req.user
    try{    
        const todasLasFacturas = await Factura.findAll({where:{usuarioId:usuario.id},include:{model:Producto},order:[["createDate","DESC"]]})
        res.json(todasLasFacturas)
    }catch(e){ 
        res.status(401 ).json({error:`No se pudo obtener todas las facturas del usuario: ${usuario.nombre} debido a: ${e}`})
    }
}
const obtenerTodasLasFacturasAdmin=async(req,res)=>{
    const usuario = req.user
    try{
        const todasLasFacturas=await Factura.findAll()
        res.json(todasLasFacturas)
    }catch(e){
        res.json({error: `no se pudo obtener todas las facturas para el administrador: ${usuario.nombre} debido a: ${e}`})
    }
}

const generarFacturas=async(req,res)=>{
    const usuario=req.user
    const {ammount,total,arregloDeIdsProductos,telefono,direccion,nombrecompleto}=req.body
    const parseTelefono = parseInt(telefono);
    try{
        const facturaGenerada = await Factura.create({ammount,total,telefono:parseTelefono,direccion,nombreReceptor:nombrecompleto})
        await facturaGenerada.addProductos(arregloDeIdsProductos)
        await usuario.addFacturas(facturaGenerada.id)
        res.json({mensaje:`la factura con el codigo: ${facturaGenerada.id} fue creada` })
    }catch(e){
        res.status(401).json({error: `sucedio un error al intentar generar una nueva factura debido a: ${e}`})
    }
}

const edicionDeFacturas=async(req,res)=>{
    const {id} = req.params
    const {status} = req.body
    try{
        const facturaPedida= await Factura.findByPk(id)
        facturaPedida.set({status})
        await facturaPedida.save()
        const todasLasFacturas = await Factura.findAll()
        res.json(todasLasFacturas)
    }catch(e){
        res.status(401).json({error:`sucedio un error la intentar actualizar la factura con id ${id} debido a: ${e}`})
    }
}
const eliminarFactura = async(req,res) =>{
    const {id} = req.params
    try{
        const facturaAEliminar=await Factura.findByPk(id)
        await facturaAEliminar.destroy()
        const facturasActualizadas=await Factura.findAll() 
        res.json(facturasActualizadas)
    }catch(e){
        res.json({error: `hubo un error al intentar eliminar la factura con el id: ${id} debido a: ${e}`})
    }
}

module.exports={
    obtenerFacturas,
    obtenerTodasLasFacturasAdmin,
    generarFacturas,
    edicionDeFacturas,
    eliminarFactura
}