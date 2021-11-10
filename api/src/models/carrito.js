const {DataTypes} = require("sequelize")
module.exports =(sequelize)=>{
    return sequelize.define("",{
        idCarrito:{
            type:DataTypes.UUID,
            primaryKey: true,
        },
        idProducto:{
            type:DataTypes.UUID,
        },
        cantidad:{
            type:DataTypes.INTEGER,
        },
        nombre:{
            type:DataTypes.STRING,
        },
        precio:{
            type:DataTypes.DOUBLE,
        },
        imagen:{
             type:DataTypes.TEXT
        }
        // categoria:{
        //     type: DataTypes.ENUM("Cajones y Cultivos","Plantines y Semillas","Composteras","Insumos y Herramientas para Huertas","Lombrices Rojas Californeanas"),
        // }
    }) 
}
