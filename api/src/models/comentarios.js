const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

   return sequelize.define('comentarios', {
  //no paso id para q sequelize asuma q es un integro autoincremental
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    puntaje: {
      type: DataTypes.ENUM('1','2','3','4','5','6','7','8', '9', '10'),
      allowNull: false
    },

  },
 );

};