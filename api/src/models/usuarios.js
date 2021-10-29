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
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'user'),
    },
    
  },
  {
    timestamps: false
  });
  
};
