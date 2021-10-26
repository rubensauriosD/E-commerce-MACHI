const { Comentarios } = require("../db");

async function getComments(req, res, next) {
  try {
    let comments = await Comentarios.findAll();

    return res.send({ comments: comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteComments(req, res) {
    const { id } = req.params;
  
    const comment = await Producto.findByPk(id);
  
    Producto.destroy({
      where: {
        id: id,
      },
    });
  
    res.send(comment);
  }

async function putComments(req, res) {
  const { id } = req.params;

  const { comentarios, puntaje } = req.body;

  await Comentarios.update(
    {
      comentarios,
      puntaje,
    },
    {
      where: { id: id },
    }
  );
  const comment = await Comentarios.findByPk(id);
  res.send(comment);
}

async function postComments(req, res, next) {
  const { comentarios, puntaje } = req.body;

  try {
    const newComment = await Comentarios.create({
      comentarios: comentarios,
      puntaje: puntaje,
    });

    res.send(newComment); //Falta relaciones!!
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
