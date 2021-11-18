const utilsComments = require('./utilsComment');

const newComment = async (req,res) =>{
  const {comentarios, puntuacion, usuarioId, productoId} = req.body;
  try{
      await utilsComments.newComment({comentarios, puntuacion, usuarioId, productoId})
          res.status(200).json({success:true})
  }
  catch(error){
    console.log(error)
    throw error
  }
};

const getComments = async (req,res)=>{
  const {id} = req.params;
  res.json( await utilsComments.getComments(id))
};


module.exports = {newComment,getComments}
