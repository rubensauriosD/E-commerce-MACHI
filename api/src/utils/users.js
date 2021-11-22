const { Usuario, Carrito, Producto, Factura, Comentario } = require("../db");
const bCrypt = require("bcrypt-nodejs");
const CreadorDeEncriptado = function (contrasenia) {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
};
async function becomeUser(req, res) {
  try {
    const contrasenia = "Ab12345*";
    const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
const nuevoUsuario = await Usuario.findOrCreate({
      where: { nombre: "Dieguito"},
      defaults: {
      nombre: "Dieguito",
      apellido: "Maradona",
      email: "user@gmail.com",
      contrasenia: contraseñaEncriptada,
      tipo: "user",
      },
    });
  } catch (error) {
    res.status(404).json({error:`${error}`})
  }
}
async function becomeAdmin(req, res) {
  try {
    const contrasenia = "Ab12345*";
    const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
const nuevoAdmin = await Usuario.findOrCreate({
      where: { nombre: "Ronaldinho"},
      defaults: {
      nombre: "Ronaldinho",
      apellido: "Gaucho",
      email: "admin@gmail.com",
      contrasenia: contraseñaEncriptada,
      tipo: "admin",
      },
    });
  } catch (error) {
    res.status(404).json({error:`${error}`})
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
    res.status(404).json({error: "this is the error: " + error });
  }
}

async function inicioDeSesion(req, res) {
  const { carritos } = req.body;
  const usuario = req.user;
  const idProductosusuario = usuario.carritos.map((item) => item.idProducto);
  try {
    if (carritos.length) {
      if (!idProductosusuario.length) {
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
        return res.json(usuario);
      }
      for (let i = 0; i < carritos.length; i++) {
        for (let j = 0; j < idProductosusuario.length; j++) {
          if (carritos[i].idProducto == idProductosusuario[j]) {
            break;
          }
          if (j >= idProductosusuario.length - 1) {
            let carritoCreado = await Carrito.create({
              idCarrito: carritos[i].idCarrito,
              idProducto: carritos[i].idProducto,
              cantidad: carritos[i].qty,
              nombre: carritos[i].nombre,
              precio: carritos[i].precio,
              imagen: carritos[i].imagen,
            });
            await usuario.addCarrito(carritoCreado);
            return res.json(usuario);
          }
        }
      }
      return res.json(usuario);
    } else {
      return res.json(usuario);
    }
  } catch (e) {
    return res.status(401).json({ error: `${e}` });
  }
}

function pedidoCerrarSesion(req, res) {
  req.logout();
  res.json({ message: "Ok" });
}

async function inicioFacebook(req, res) {
  const { carritos } = req.body;
  const usuario = req.user;
  const usuarioFacebookDb=await Usuario.findByPk(usuario.id,{include:{model:Carrito}})
  const idProductosusuario = usuarioFacebookDb.carritos.map((item) => item.idProducto);
  try {
    if (carritos.length) {
      if (!idProductosusuario.length) {
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
        return res.json(usuario);
      }
      for (let i = 0; i < carritos.length; i++) {
        for (let j = 0; j < idProductosusuario.length; j++) {
          if (carritos[i].idProducto == idProductosusuario[j]) {
            break;
          }
          if (j >= idProductosusuario.length - 1) {
            let carritoCreado = await Carrito.create({
              idCarrito: carritos[i].idCarrito,
              idProducto: carritos[i].idProducto,
              cantidad: carritos[i].qty,
              nombre: carritos[i].nombre,
              precio: carritos[i].precio,
              imagen: carritos[i].imagen,
            });
            await usuario.addCarrito(carritoCreado);
            return res.json(usuario);
          }
        }
      }
      return res.json(usuario);
    } else {
      return res.json(usuario);
    }
  } catch (e) {
    return res.status(401).json({ error: `${e}` });
  }
}


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
  CambioContraseñaUsuario
};
