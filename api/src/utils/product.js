const { Producto, Op } = require("../db");

async function getProductos(req, res) {
  try {
    let { nombre } = req.query;
    let products = [];
    //#region search by NAME
    if (nombre && nombre !== "") {
      products = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%`,
          },
        },
      });
    } else {
      products = await Producto.findAll(); //Si no hay input devuelve todo
    }
    //#endregion NAME

    return res.send({
      products: products,
    });
  } catch (error) {
    return res.status(404);
  }
}



async function deleteProductos(req, res) {
  const { id } = req.params;

  let product = await Producto.findByPk(id);

  Producto.destroy({
    where: {
      id: id,
    },
  });

  res.json(product); //devuelvo el producto eliminado
}


async function putProductos(req, res) {
  const { id } = req.params;

  const { nombre, imagen, precio, descripcion, disponibilidad } = req.body;

  await Producto.update(
    {
      nombre,
      imagen,
      precio,
      descripcion,
      disponibilidad,
    },
    {
      where: { id: id },
    }
  );

  const product = await Producto.findByPk(id);
  res.json(product);
}


async function postProductos(req, res) {

  const {array} = req.body;
  try {
    const Productos=await Producto.bulkCreate(array)

    await Productos.setUsuario(id)
    return res.json(Productos).send('Producto publicado con exito');

  } catch (error) {
    console.log(error);
    res.status(404).json({error:`this is the error: ${error}`})
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
