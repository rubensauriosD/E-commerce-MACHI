const utilsComments = require('./utilsComment');


const newComment = async (req,res) =>{
    const {comentarios, usuarioId, productoId} = req.body;
    try{
        await utilsComments.newComment({comentarios, usuarioId, productoId})
            res.status(200).json({success:true})
    }
    catch(error){
    console.log(error)
    throw error
    }
};


const getComments = async (_req,res)=>{
    res.json( await utilsComments.getComments())
};

module.exports = {newComment,getComments}