require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const UsuarioModel = require('./models/usuarios');
const ProductosModel = require('./models/productos');
const ImagenesModel = require('./models/imagenes');
const ComentariosModel = require('./models/comentarios');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce_machi`, {
  logging: false,
  native: false,
});

const Usuario = UsuarioModel(sequelize)
const Producto = ProductosModel(sequelize)
const Imagen = ImagenesModel(sequelize)
const Comentario = ComentariosModel(sequelize)

// *Relaciones*
//Usuario(admin) - Producto:
Usuario.hasMany(Producto);
Producto.belongsTo(Usuario);

//comentario - Producto - Usuario:
Producto.hasMany(Comentario);
Usuario.hasMany(Comentario);
Comentario.belongsTo(Usuario);
Comentario.belongsTo(Producto);

//Porducto - Imagen:
Producto.hasMany(Imagen);
Imagen.belongsTo(Producto);


module.exports = {
  conn: sequelize,
  Usuario,
  Producto,
  Imagen,
  Comentario,
  Op
};

