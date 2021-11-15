const { Carrito } = require("../db");

const obtenerCarrito = async (req, res) => {
  const usuario = req.user;
  try {
    const carritodelUsuario = await Carrito.findAll({
      where: { usuarioId: usuario.id },
    });
    res.json(carritodelUsuario);
    //Naruto >:v hacer orden del carro
  } catch (e) {
    res
      .status(401)
      .json({
        error: `no se pudo obtener los items del carro del usuario: ${usuario.nombre} debido a: ${e}`,
      });
  }
};

const postCarrito = async (req, res) => {
  const usuario = req.user;
  const { idCarrito, idProducto, imagen, precio, nombre } = req.body;
  try {
    const objetoCarritoNuevo = await Carrito.create({
      idCarrito,
      idProducto,
      imagen,
      precio,
      nombre,
      cantidad: 1,
    });
    await usuario.addCarritos(idCarrito);
    const objetosDelCarro = await Carrito.findAll({
      where: { usuarioId: usuario.id },
    });
    res.json(objetosDelCarro);
  } catch (error) {
    res
      .status(401)
      .json({
        error: `al momento de crear un objeto en el carro con el usuario: ${usuario.nombre} se genero: ${error}`,
      });
  }
};

const cambiarCantidadDeCarrito = async (req, res) => {
  const usuario = req.user;
  const { idCarrito } = req.params;
  const cifraDeCantidadACambiar = Number(req.body.valor);
  try {
    const carritoEncontradoPorId = await Carrito.findByPk(idCarrito);
    if (
      cifraDeCantidadACambiar === 1 ||
      (cifraDeCantidadACambiar === -1 && carritoEncontradoPorId.cantidad > 1)
    ) {
      carritoEncontradoPorId.set({
        cantidad: carritoEncontradoPorId.cantidad + cifraDeCantidadACambiar,
      });
    }
    await carritoEncontradoPorId.save();
    const carritoActualizado = await Carrito.findAll({
      where: { usuarioId: usuario.id },
    });
    res.json(carritoActualizado);
  } catch (error) {
    res.status(401).json({
      error: `el error al intentar cambiar la cantidad del carrito fue: ${error}`,
    });
  }
};
const eliminarCarritoDeLaDB = async (req, res) => {
  const usuario = req.user;
  const { idCarrito } = req.params;
  try {
    const carritoAEliminar = await Carrito.findByPk(idCarrito);
    await carritoAEliminar.destroy();
    const carritoActualizado = await Carrito.findAll({
      where: { usuarioId: usuario.id },
    });
    res.json(carritoActualizado);
  } catch (e) {
    res
      .status(401)
      .json(`el error al eliminar un elemento del carrito fue: ${e}`);
  }
};

module.exports = {
  postCarrito,
  cambiarCantidadDeCarrito,
  eliminarCarritoDeLaDB,
  obtenerCarrito,
};
