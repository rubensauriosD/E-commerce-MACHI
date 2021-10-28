const { Comentario } = require("../db");

async function getComments(req, res, next) {
  try {
    let comments = await Comentario.findAll();

    return res.send({ comments: comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteComments(req, res) {
    const { id } = req.params;

    const comment = await Comentario.findByPk(id);

    Comentario.destroy({
      where: {
        id: id,
      },
    });

    res.send(comment);
  }

async function putComments(req, res) {
  const { id } = req.params;

  const { comentarios, puntaje } = req.body;

  await Comentario.update(
    {
      comentarios,
      puntaje,
    },
    {
      where: { id: id },
    }
  );
  const comment = await Comentario.findByPk(id);
  res.send(comment);
}

async function postComments(req, res, next) {
  const { comentarios, puntaje, productoId, usuarioId } = req.body;

  try {
    const newComment = await Comentario.create({
      comentarios: comentarios,
      puntaje: puntaje,
      productoId: productoId,
      usuarioId: usuarioId
    });

    await newComment.setUsuario(id)
    res.send(newComment);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getComments,
  deleteComments,
  putComments,
  postComments
};

const {CommentSafePlace,User} = require('../db');

async function newComment(data){
    let newComment = await CommentSafePlace.create({
      comment_text, userId, safePlaceId
    })
};


const ServicesCommentSafePlace = require('../services/commentSafePlace');


const newComment = async (req,res) =>{
    const {comment_text, userId, safePlaceId} = req.body;
    try{
        await ServicesCommentSafePlace.newComment({comment_text, userId, safePlaceId})
            res.status(200).json({success:true})
    }
    catch(error){
    console.log(error)
    throw error
    }
};


