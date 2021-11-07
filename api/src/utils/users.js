const { Usuario, Producto,Factura } = require("../db");
const bCrypt = require("bcrypt-nodejs");
const CreadorDeEncriptado = function (contrasenia) {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
};
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

  const { nombre, apellido, email, contraseña, tipo } = req.body;

  await Usuario.update(
    {
      nombre,
      apellido,
      email,
      contraseña,
      tipo,
    },
    {
      where: { id: id },
    }
  );

  const user = await Usuario.findByPk(id);
  res.json(user);
}

async function postUsuario(req, res) {
  const { nombre, apellido, email, contrasenia, tipo } = req.body;

  try {
    if (nombre && apellido && email && contrasenia && tipo) {
      const verficadorDeUsuario = await Usuario.findAll({ where: { email } });
      if (verficadorDeUsuario.length === 0) {
        const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
        const nuevoUsuario = await Usuario.create({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasenia: contraseñaEncriptada,
          tipo: tipo.value,
        });
        res.json({ message: "Success" });
      } else {
        res
          .status(404)
          .json({
            error: "El Correo Ingresado ya Tiene Cuenta Activa en Machi",
          });
      }
    } else {
      res.status(404).json({ error: "Faltan Datos" });
    }
  } catch (error) {
    console.log(error);
    +apellidores.json({ error: "this is the error: " + error });
  }
}

async function inicioDeSesion(req, res) {
  const {idProductosCantidad}=req.body //llega el array de productos idProductos=["dfgbfdb","fdgbfdb","fdgbfdb"]
  const { id,nombre, apellido, email, tipo,productos } = req.user;
  try{
    const usuarioEncontrado=await Usuario.findByPk(id)
    if(idProductos.length){               //Se Verifica que llegue un array de ids
      await usuarioEncontrado.setProductos(idProductos)     //Se añaden los productos (cambiarlo por la tabla que contendra la union)
    }
    const usuario= await Usuario.findByPk(id,{include:{model:Producto}})  //cambiar el inlude model por la nueva tabla relacionada
    res.json(usuario);
  }catch(e){
    res.status(401).json({error:`${e}`})
  }
}

function pedidoCerrarSesion(req, res) {
  req.logout();
  res.json({ message: "Ok" });
}

function inicioFacebook(req, res) {
  const { id, nombre, tipo } = req.user;
  res.json({ message: "autorizado ", id, nombre, tipo });
}

module.exports = {
  getUsuario,
  putUsuario,
  postUsuario,
  deleteUsuario,
  inicioDeSesion,
  pedidoCerrarSesion,
  inicioFacebook
};
