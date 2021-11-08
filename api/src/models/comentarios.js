const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

   return sequelize.define('comentarios', {
  //no paso id para q sequelize asuma q es un integro autoincremental
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
 );

};