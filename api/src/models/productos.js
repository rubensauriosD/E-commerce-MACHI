const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('productos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    categoria:{
      type: DataTypes.ENUM("Cajones y Cultivos","Plantines y Semillas","Composteras","Insumos y Herramientas para Huertas","Lombrices Rojas Californeanas"),
      allowNull:false
    }
    
  },
  {
    timestamps: false
  });
  
};
