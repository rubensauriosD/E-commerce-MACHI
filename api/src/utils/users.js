const { Usuario, Carrito, Producto, Factura, Comentario } = require("../db");
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
          // pregunta,
          // respuesta,
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
      if (!idProductosusuario.length) {
        console.log("el usuario no tiene nada y el carrito si tiene");
        carritos.forEach(async (item) => {
          let carritoCreado = await Carrito.create({
            idCarrito: item.idCarrito,
            idProducto: item.idProducto,
            cantidad: item.qty,
            nombre: item.nombre,
            precio: item.precio,
            imagen: item.imagen,
          });
          await usuario.addCarrito(carritoCreado);
        });
        res.json(usuario);
      }
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
            await usuario.addCarrito(carritoCreado);
            res.json(usuario);
          }
        }
      }
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
  const { carritos } = req.body;
  const usuario = req.user;
  console.log("este es el usuario", usuario);
  const idProductosusuario = usuario.carritos.map((item) => item.idProducto);
  console.log("los id de los productos del usuario", idProductosusuario);
  console.log("y aca el carrito de invitado", carritos);
  try {
    if (carritos.length) {
      console.log("primer hola");
      if (!idProductosusuario.length) {
        console.log("el usuario no tiene nada y el carrito si tiene");
        carritos.forEach(async (item) => {
          let carritoCreado = await Carrito.create({
            idCarrito: item.idCarrito,
            idProducto: item.idProducto,
            cantidad: item.qty,
            nombre: item.nombre,
            precio: item.precio,
            imagen: item.imagen,
          });
          await usuario.addCarrito(carritoCreado);
        });
        res.json(usuario);
      }
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
            await usuario.addCarrito(carritoCreado);
            res.json(usuario);
          }
        }
      }
      res.json(usuario);
    } else {
      console.log("pasor por aca");
      res.json(usuario);
    }
  } catch (e) {
    res.status(401).json({ error: `${e}` });
  }
}

const CambiarSeguridadDeContrasenia = async (req, res, next) => {
  const { email, respuesta, pregunta } = req.body;
  try {
    const usuarioEncontrado = await Usuario.findOne({ where: { email } });
    if (
      usuarioEncontrado.respuesta !== respuesta ||
      usuarioEncontrado.pregunta !== pregunta
    )
      return res
        .status(401)
        .json({ mensaje: "Pregunta o Respuesta Incorrecta" });
    // res.json({ mensaje: "Respuesta y Pregunta Correcta" });
    next();
  } catch (error) {
    res.status(401).json({
      mensaje: `error al cambiar la seguridad de la contraseña ${error}`,
    });
  }
};

const CambioContraseñaUsuario = async (req, res) => {
  const { nuevaContrasenia, email } = req.body;
  const contraseniaEncriptada = CreadorDeEncriptado(nuevaContrasenia);
  try {
    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    usuario.set({ contrasenia: contraseniaEncriptada });
    await usuario.save();
    res.json({
      message: `La contraseña para el usuario: ${usuario.nombre}, se cambio exitosamente`,
    });
  } catch (e) {
    res.status(401).json({
      error: `Aparecio un error al intentar cambiar la contraseña: ${e}`,
    });
  }
};

const verficacionUsuarioFactura = async (req, res) => {
  const usuario = req.user; // el usuario que posteo el comentario
  const { comentario, idProducto } = req.body; // el comentario que llega y el id del producto
  try {
    const facturaDeUsuario = await Factura.findAll({
      // Buscar facturas del usuario
      where: {
        usuarioId: usuario.id,
      },
      include: {
        model: Producto,
      },
    });
    const productoEncontrado = facturaDeUsuario
      .map((factura) =>
        factura.productos.filter((producto) => producto.id === idProducto)
      )
      .flat(); // encontrar el producto entre las facturas del usuario
    if (!productoEncontrado.length)
      return res.status(401).json({
        error: `no se encontro que el usuario  ${usuario.nombre} halla hecho una compra de este producto`,
      });
    const comentariosParaModificar = await Comentario.create({
      comentarios: comentario,
    });
    res.json({ mensaje: "comentario modificado" });
  } catch (e) {
    res.status(401).json({
      error: `error al postear un comentario por parte del usuario ${usuario.nombre}, el error es: ${e}`,
    });
  }
};

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
  CambioContraseñaUsuario,
  CambiarSeguridadDeContrasenia,
};
