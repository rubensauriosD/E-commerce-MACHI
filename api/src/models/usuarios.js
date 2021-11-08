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
    }
  },
  {
    timestamps: false
  });
  
};
