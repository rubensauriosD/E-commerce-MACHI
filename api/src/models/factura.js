const { DataTypes } = require('sequelize');
const Sequelize=require("sequelize")
module.exports = (sequelize) => {

return sequelize.define('factura', {
    id: {
        type: DataTypes.UUID ,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    ammount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    nombreReceptor:{
        type:DataTypes.STRING,
        allowNull:false
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false 
    },
    createDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TEXT,
        values:["creada","procesando","cancelada","completa"],
        defaultValue: "creada"
    },
}, {
    timestamps: false
})
}
