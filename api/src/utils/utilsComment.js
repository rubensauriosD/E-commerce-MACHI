const {Comentario, Usuario} = require('../db.js');



async function newComment(data){
    let newComment = await Comentario.create(data)
};


async function getComments(){
    try{
        return await Comentario.findAll({
            include:[{
                model: Usuario,
                attributes : ['nombre','id']
            }]
        });
    }
    catch(error){
        console.log(error)
        throw error
    };
};


module.exports = {newComment,getComments}