const { Imagen, cloud } = require("../db");

async function getImagenes(req, res) {
  let image = await Imagen.findAll();

  try {
    if (image) {
      res.json(image);
    } else {
      return res.status(404).send("No hay imagenes existentes.");
    }
  } catch (error) {
    return res.status(404);
  }
}

async function deleteImagenes(req, res) {
  const { id } = req.params;
  try{
    const image = await Imagen.findByPk(id);
    cloud.uploader.destroy(image.id);
    await image.destroy();
    const imagenes= await Imagen.findAll()
    res.json(imagenes);
  }
  catch(e){
    res.status(404).json(e)
  }
}

async function postImagenes(req, res) {
  const { public_id, url } = req.body;
  try {
      await Imagen.create({
          id: public_id,
          imagen: url,
      });
      const imagenes=await Imagen.findAll()
      res.json(imagenes)
  } catch (error) {
      console.log(error);
  }
}

module.exports = {
  getImagenes,
  postImagenes,
  deleteImagenes,
};
