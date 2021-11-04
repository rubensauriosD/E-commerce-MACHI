const {Comentario, Producto, Usuario} = require('../db.js');
const { Op, where } = require('sequelize');
const usuarios = require('../models/usuarios');

async function postComentarios (req, res) {
  const {comentarios, puntaje, idProducto, idUsuario} = req.body;
  const createComment = await Comentario.create({
    comentarios,
    puntaje
  })
  const findProducto = await Producto.findOne({
    where: {
      id: idProducto
    }
  })
  const findUsuario = await Usuario.findOne({
    where: {
      id: idUsuario
    }
  })
  await createComment.setProducto(findProducto)
  await createComment.setUsuario(findUsuario)
  return res.send(createComment);
};


async function deleteComentarios (req, res) {
  const {idComentario} = req.params;

  await Comentario.destroy({
    where: {
      id: idComentario
    }
  })
  return res.send(Comentario.findAll())
};


async function getIdComentarios (req, res) {
  const {id} = req.params;

  const findProducto = await Comentario.findAll({
    include: [Usuario],
    where: {
      productoId: id
    }
  })
  return res.send(findProducto)
};

async function getUserComentarios (req, res) {
  const {idUser} = req.params;

  const comentarios = await Comentario.findAll({
    where: {
      usuarioId: idUser
    }
  })
  return res.send(comentarios)
};

async function getPuntajeComentarios (req, res) {
  const {idUser} = req.params;

  const puntajeUser = await Producto.findAll({
    where: {
      usuarioId: idUser
    },
    include: [{
      model: Comentario
    }]
  })
  var puntaje = [];
  puntajeUser.forEach(e => {
    if(e.comentarios.length > 0) {
      e.comentarios.forEach(i => puntaje.push(i.puntaje))
    }
  })
  console.log('espero que funcione', puntaje.length)
  if(puntaje.length > 0)
  return res.json((puntaje.reduce((accumulator, currentValue) => accumulator + currentValue) / puntaje.length).toFixed(2))
  return res.send('El puntaje')
};

module.exports = {
  postComentarios,
  deleteComentarios,
  getIdComentarios,
  getUserComentarios,
  getPuntajeComentarios
};




