const { Producto, Op, cloud } = require("../db");

async function getProductos(req, res) {
  console.log("lo que llega por query",req.query)
  try {
    let { nombre, ordenamiento, categoria, pagina } = req.query;
    let productos = []
    let resultado
    const productosXpagina = 6
    //#region search by NAME
    if (nombre !== "" && typeof nombre === "string") {
      console.log("paso por la busqueda de nombre")
      productos = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%`,
          },
        },
        order:[["createdAt","DESC"]]
      });
      console.log("paso por nombre y devolvio esto: ",productos)
    } else {
      console.log("paso por la traida de todos los productos")
      productos = await Producto.findAll({order:[["createdAt","DESC"]]}); //Si no hay input devuelve todo
    }
    //#endregion

     //#region ORDEN
     if(ordenamiento !== "") {
       productos = productos.sort((a,b) =>{
         switch (ordenamiento) {
           case "ascendente": return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
           case "descendente": return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())  
          case "menor precio": return a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0
           case "mayor precio": return b.precio > a.precio ? 1 : b.precio < a.precio ? -1 : 0
           default: return 0;
         }
      })
     }
    //#endregion

    //#region FILTRO POR CATEGORIA
    if (categoria && categoria !== "") {
      productos = productos.filter((producto) => {return producto.categoria === categoria})
    }
    //#endregion

    //#region PAGINA
    resultado = productos.slice((productosXpagina * (pagina -  1)) , (productosXpagina * (pagina -  1)) + productosXpagina )
    //#endregion

    return res.json({
      resultado: resultado,
      productos: productos,
      contador: productos.length
    });
  } catch (error) {
    return res.status(404).json({error:`el error al intentar sacar productos a la tienda es ${error}`});
  }
}



async function deleteProductos(req, res) {
  const { id } = req.params;

  let product = await Producto.findByPk(id);
  const idImagenCloudinary = product.imagen.split('/').pop().split('.').shift();
  await product.destroy();
  await cloud.uploader.destroy(idImagenCloudinary);
  const todosLosProductos = await Producto.findAll
  res.json(todosLosProductos); //devuelvo el producto eliminado
}


async function putProductos(req, res) {
  const { id } = req.params;
  const { nombre, precio, imagen, descripcion, disponibilidad, categoria,cantidadDeProducto } = req.body;
  try{
    const product = await Producto.findByPk(id);
    const idImagenCloudinary = product.imagen.split('/').pop().split('.').shift();
    await product.update(
      {
        nombre, 
        imagen,
        precio,
        descripcion,
        disponibilidad:Number(cantidadDeProducto)===0?false:disponibilidad||product.disponibilidad,
        categoria,
        cantidadDeProducto
      }
    );
      await product.save()
      await cloud.uploader.destroy(idImagenCloudinary);
      const todosLosProductos=await Producto.findAll()
      res.json(todosLosProductos);
  }catch(e){
    res.status(401).json({error:`el error al tratar de modificar el producto con el nombre: ${nombre}, es: ${e}`})
  }
  

}

async function descuentoStock(req,res){
  const {id,cantidad}=req.body
  try{
    const producto=await Producto.findByPk(id)
    const descuento=producto.cantidadDeProducto-cantidad
    await producto.update({cantidadDeProducto:descuento})
    res.json(producto)
  }catch(e){
    res.status(404).json({error:`el error es: ${e}`})
  }
}

async function postProductos(req, res) {
  const {nombre, precio, imagen, categoria, descripcion, disponibilidad, cantidadDeProducto } = req.body
  try {
    await Producto.create({ nombre, imagen, precio, categoria, descripcion, disponibilidad, cantidadDeProducto })
    return res.send('Producto publicado con exito');

  } catch (error) {
    console.log(error);
    res.status(404).json({error:`Error al generar un  nuevo producto, debido a: ${error}`})
  }
}

async function getProducto (req,res){
  const {id}=req.params
try{
  const llegadaProductoPorId=await Producto.findByPk(id)
  res.json(llegadaProductoPorId)
}catch(e){
  res.status(404).json({error:`el error es: ${e}`})
}
}


module.exports = {
  getProductos,
  putProductos,
  postProductos,
  deleteProductos,
  getProducto
};
