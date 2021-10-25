require('dotenv').config();
const { Sequelize } = require('sequelize');
const UsuarioModel = require('./models/usuarios');
const ProductosModel = require('./models/productos');
const ImagenesModel = require('./models/imagenes');

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

  module.exports = {
     conn: sequelize,
     Usuario,
     Producto,
     Imagenes
  };