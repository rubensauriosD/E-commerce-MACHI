require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const UsuarioModel = require('./models/usuarios');
const ProductosModel = require('./models/productos');
const ImagenesModel = require('./models/imagenes');
const ComentariosModel = require('./models/comentarios');
const FacturaModel=require("./models/factura")
const CarritosModel=require("./models/carrito")

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce_machi`,
        { logging: false, native: false }
      );

const Factura = FacturaModel(sequelize)
const Usuario = UsuarioModel(sequelize)
const Producto = ProductosModel(sequelize)
const Imagen = ImagenesModel(sequelize)
const Comentario = ComentariosModel(sequelize)
const Carrito = CarritosModel(sequelize)
// *Relaciones*
// Usuario(admin) - Producto:
Usuario.hasMany(Producto);
Producto.belongsTo(Usuario);

//Relacion entre (Un usuario puede tener varias facturas, una factura puede tener un usuario, una factura puede tener varios productos )

Usuario.hasMany(Factura)
Factura.belongsTo(Usuario)
Factura.hasMany(Producto)

//Relacion entre Usuario-carrito

Usuario.hasMany(Carrito)
Carrito.belongsTo(Usuario)

//comentario - Producto - Usuario:
Producto.hasMany(Comentario);
Usuario.hasMany(Comentario);
Comentario.belongsTo(Usuario);
Comentario.belongsTo(Producto);

//Porducto - Imagen:
//Producto.hasMany(Imagen);
//Imagen.belongsTo(Producto);


module.exports = {
  conn: sequelize,
  Usuario,
  Producto,
  Imagen,
  Comentario,
  Factura,
  Carrito,
  Op
};

