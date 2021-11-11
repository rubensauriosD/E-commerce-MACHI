const { Producto, Op, cloud } = require("../db");

async function getProductos(req, res) {
  try {
    let { nombre, ordenA, ordenP, filtroC, pagina } = req.query;
    let productos = []
    let resultado
    pagina = pagina ? pagina : 1
    const productosXpagina = 6
    //#region search by NAME
    if (nombre && nombre !== "") {
      productos = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%`,
          },
        },
      });
    } else {
      productos = await Producto.findAll(); //Si no hay input devuelve todo
    }
    //#endregion NAME
    
    //#region ORDEN ALFABETICO
    if (ordenA === "asc") {
      productos = productos.sort((a,b) =>{
        return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()) 
      })
    }
    if (ordenA === "desc"){
      productos = productos.sort((a,b) =>{
        return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
      })
    }
    //#endregion

    //#region ORDEN PRECIO
    if (ordenP === "asc") {
      productos = productos.sort((a, b) => {
        return a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0
      })
    }
    if (ordenP === "desc") {
      productos = productos.sort((a,b) => {
        return b.precio > a.precio ? 1 : b.precio < a.precio ? -1 : 0
      })
    }
    //#endregion

    //#region FILTRO POR CATEGORIA
    if (filtroC && filtroC !== "") {
      productos = productos.filter((producto) => {return producto.categoria === filtroC})
    }
    //#endregion

    //#region PAGINA
    resultado = productos.slice((productosXpagina * (pagina -  1)) , (productosXpagina * (pagina -  1)) + productosXpagina )
    //#endregion

    return res.send({
      resultado: resultado,
      productos: productos,
      contador: productos.length
    });
  } catch (error) {
    return res.status(404);
  }
}



async function deleteProductos(req, res) {
  const { id } = req.params;

  let product = await Producto.findByPk(id);
  const idImagenCloudinary = product.imagen.split('/').slice(-1).split('.').shift();
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
    const idImagenCloudinary = product.imagen.split('/').slice(-1).split('.').shift();
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
