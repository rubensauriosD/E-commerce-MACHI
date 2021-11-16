const { Usuario, Carrito, Producto } = require("../db");
const bCrypt = require("bcrypt-nodejs");
const CreadorDeEncriptado = function (contrasenia) {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
};
async function becomeUser(req, res) {
  try {
    const contrasenia = "Ab12345*";
    const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
    const nuevoUser = await Usuario.create({
      nombre: "fish",
      apellido: "san",
      email: "user@gmail.com",
      contrasenia: contraseñaEncriptada,
      tipo: "user",
    });
  } catch (error) {
    console.log(error);
  }
}
async function becomeAdmin(req, res) {
  try {
    const contrasenia = "Ab12345*";
    const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
    const nuevoAdmin = await Usuario.create({
      nombre: "fish",
      apellido: "san",
      email: "admin@gmail.com",
      contrasenia: contraseñaEncriptada,
      tipo: "admin",
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUsuario(req, res) {
  let users = await Usuario.findAll();

  try {
    if (users) {
      res.json(users);
    } else {
      return res.status(404).send("No hay usuarios existentes.");
    }
  } catch (error) {
    return res.status(404);
  }
}

async function deleteUsuario(req, res) {
  const { id } = req.params;

  let user = await Usuario.findByPk(id);

  Usuario.destroy({
    where: {
      id: id,
    },
  });

  res.json(user);
}

async function putUsuario(req, res) {
  const { id } = req.params;
  const { tipo } = req.body;
  try {
    const user = await Usuario.findByPk(id);
    user.set({
      tipo: tipo || user.tipo,
    });
    await user.save();
    const todosLosUsuarios = await Usuario.findAll();
    console.log("todos los usuario despues de actualizar: ", todosLosUsuarios);
    res.json(todosLosUsuarios);
  } catch (e) {
    res.status(404).json({
      error: `error al actualizar el usuario ${nombre} con id: ${id} debido a: ${e}`,
    });
  }
}

async function postUsuario(req, res) {
  const { nombre, apellido, email, contrasenia } = req.body;

  try {
    if (nombre && apellido && email && contrasenia) {
      const verficadorDeUsuario = await Usuario.findAll({ where: { email } });
      if (verficadorDeUsuario.length === 0) {
        const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
        const nuevoUsuario = await Usuario.create({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasenia: contraseñaEncriptada,
          tipo: "user",
        });
        res.json({ message: "Success" });
      } else {
        res.status(404).json({
          error: "El Correo Ingresado ya Tiene Cuenta Activa en Machi",
        });
      }
    } else {
      res.status(404).json({ error: "Faltan Datos" });
    }
  } catch (error) {
    console.log(error);
    apellidores.json({ error: "this is the error: " + error });
  }
}

async function inicioDeSesion(req, res) {
  const { carritos } = req.body;

  const usuario = req.user;
  console.log("este es el usuario", usuario);
  const idProductosusuario = usuario.carritos.map((item) => item.idProducto);
  console.log("los id de los productos del usuario", idProductosusuario);
  console.log("y aca el carrito de invitado", carritos);
  try {
    if (carritos.length) {
      console.log("primer hola");
      for (let i = 0; i < carritos.length; i++) {
        console.log("i", i);
        for (let j = 0; j < idProductosusuario.length; j++) {
          console.log("j", j);
          if (carritos[i].idProducto == idProductosusuario[j]) {
            console.log("entro en el break");
            break;
          }
          if (j >= idProductosusuario.length - 1) {
            console.log("entro en la creacion", carritos[i].idCarrito);
            let carritoCreado = await Carrito.create({
              idCarrito: carritos[i].idCarrito,
              idProducto: carritos[i].idProducto,
              cantidad: carritos[i].qty,
              nombre: carritos[i].nombre,
              precio: carritos[i].precio,
              imagen: carritos[i].imagen,
            });
            console.log(carritoCreado);
            await usuario.addCarrito(carritoCreado);
          }
        }
      }
      // const carrito = await Promise.all(
      //   carritos.map((carrito) =>
      //     Carrito.findOrCreate({
      //       where: { idCarrito: carrito.idCarrito },
      //       defaults: {
      //         idCarrito: carrito.idCarrito,
      //         idProducto: carrito.idProducto,
      //         cantidad: carrito.qty,
      //         nombre: carrito.nombre,
      //         precio: carrito.precio,
      //         imagen: carrito.imagen,
      //       },
      //     })
      //   )
      // );
      //const carritoEncontrado= await Carrito.findAll({where:{usuarioId:usuario.id}})
      // await usuario.addCarritos(carrito.flat().map((cart) => cart.idCarrito));
      res.json(usuario);
    } else {
      console.log("pasor por aca");
      res.json(usuario);
    }
  } catch (e) {
    res.status(401).json({ error: `${e}` });
  }
}

function pedidoCerrarSesion(req, res) {
  req.logout();
  res.json({ message: "Ok" });
}
async function inicioFacebook(req, res) {
  const usuario = req.user;
  const { carritos } = req.body;
  console.log("aca lo que llega por carrito: ", carritos);
  try {
    if (carritos) {
      console.log("paso por aca");
      const carritosCreadosOEncontrados = await Promise.all(
        carritos.map((carrito) => {
          return Carrito.findOrCreate({
            where: { idCarrito: carrito.idCarrito },
            defaults: {
              idProducto: carrito.idProducto,
              cantidad: carrito.qty,
              nombre: carrito.nombre,
              precio: carrito.precio,
              imagen: carrito.imagen,
            },
          });
        })
      );
      await usuario.addCarritos(
        carritosCreadosOEncontrados.flat().map((carrito) => carrito.idCarrito)
      );
      return res.json(usuario);
    }
    res.json(usuario);
  } catch (e) {
    res.status(401).json({
      error: `el error que a ocurrido al intentar loguearse con el usuario: ${usuario.nombre} es: ${e}`,
    });
  }
}

module.exports = {
  getUsuario,
  putUsuario,
  postUsuario,
  deleteUsuario,
  inicioDeSesion,
  pedidoCerrarSesion,
  inicioFacebook,
  becomeAdmin,
  becomeUser,
};
