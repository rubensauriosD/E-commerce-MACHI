const utilsComments = require('./utilsComment');

const newComment = async (req,res) =>{
  const {comentarios, puntuacion, usuarioId, productoId} = req.body;
  try{
      await utilsComments.newComment({comentarios, puntuacion, usuarioId, productoId})
          res.status(404).json({success:true})
  }
  catch(error){
    res.status(404).json({error:`${error}`})
    throw error
  }
};

const getComments = async (req,res)=>{
  const {id} = req.params;
  try{
    res.json( await utilsComments.getCommentarios(id))
  }catch(e){
    res.status(404).json({error:`${e}`})
  }
};


module.exports = {newComment,getComments}
