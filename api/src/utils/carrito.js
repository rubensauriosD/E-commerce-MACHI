const { Carrito, Usuario } = require("../db");

const postCarrito = async (req, res) => {
  const usuario = req.user;
  const { idCarrito, idProducto, nombre, categoria, cantidad, precio } =
    req.body;
  try {
    const [carrito, creado] = await Carrito.findOrCreate({
      where: {
        idCarrito,
      },
      defaults: {
        idProducto,
        nombre,
        categoria,
        cantidad,
        precio,
      },
    });
    console.log("se creo?: ",creado)
    if (creado) {
      await usuario.addModels(idCarrito);
      const usuarioActualizado=await Usuario.findByPk(usuario.id,{include:{model:Carrito}})
      res.json(usuarioActualizado)
    } else {
      carrito.set({ cantidad:cantidad });
      await carrito.save()
      const usuarioActualizado = await Usuario.findByPk(usuario.id, {
        include: { model: Carrito },
      });
      res.json(usuarioActualizado);
    }
  } catch (e) {
    res.status(401).json({error:`${e}`});
  }
};

module.exports = {
  postCarrito,
};
