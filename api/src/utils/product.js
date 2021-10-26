const { Producto, Op } = require("../db");

async function getProductos(req, res) {
  try {
    let { nombre } = req.query;
    let products = []
    //#region search by NAME
    if (nombre && nombre !== "") {
        products = await Producto.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${nombre}%`
                }
            },
        })
    } else {
        products = await Producto.findAll() //Si no hay input devuelve todo
    }
    //#endregion NAME

    return res.send({
      products: products
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
  const { nombre, imagen, precio, descripcion, disponibilidad } = req.body;
  try {
    if (!nombre || !imagen || !precio || !descripcion) {
      // Validacion
      res.status(404).send("The product need more data");
    } else {
      const nuevoProduct = await Producto.create({
        nombre: nombre,
        imagen: imagen,
        precio: precio,
        descripcion: descripcion,
        disponibilidad: disponibilidad,
      });
      res.json(nuevoProduct); //Falta modificar luego de realizar las relaciones de base de datos!!
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProductos,
  putProductos,
  postProductos,
  deleteProductos,
};
