const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

   return sequelize.define('comentarios', {
  //no paso id para q sequelize asuma q es un integro autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comentarios: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    puntaje: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {timestamps: false}
 );
};