const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('imagenes', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  });
  
};
