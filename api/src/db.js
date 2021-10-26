require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const UsuarioModel = require('./models/usuarios');
const ProductosModel = require('./models/productos');
const ImagenesModel = require('./models/imagenes');
const ComentariosModel = require('./models/comentarios');

const {
    DB_USER, DB_PASSWORD, DB_HOST,
  } = process.env;
  
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce_machi`, {
    logging: false, 
    native: false, 
  });

  const Usuario = UsuarioModel(sequelize)
  const Producto = ProductosModel(sequelize)
  const Imagenes = ImagenesModel(sequelize)
  const Comentarios = ComentariosModel(sequelize)

  // Relaciones

  module.exports = {
      conn: sequelize,
      Usuario,
      Producto,
      Imagenes,
      Comentarios,
      Op
  };