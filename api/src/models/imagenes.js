const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('imagenes', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
