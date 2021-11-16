const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('usuarios', {
  //no paso id para q sequelize asuma q es un integro autoincremental  
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'user'),
    },  
    facebookId:{
      type:DataTypes.STRING,
      allowNull:true
    },
    fotoDePerfil:{
      type:DataTypes.STRING
    },
    pregunta:{
      type:DataTypes.ENUM("¿Cual es tu mascota?","¿Super Heroe Favorito?","¿Nombre de la pareja?","¿Cual es tu Comida Favorita?")
    },
    respuesta:{
      type:DataTypes.STRING
    }
  },
  {
    timestamps: false
  });
  
};
