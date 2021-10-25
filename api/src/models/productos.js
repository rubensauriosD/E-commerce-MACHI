const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
    return sequelize.define('productos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
    
  },
  {
    timestamps: false
  });
  
};
