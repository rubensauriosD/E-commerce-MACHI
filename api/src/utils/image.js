const { Imagen } = require("../db");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  const image = await Imagen.findByIdAndDelete(id);
  cloudinary.uploader.destroy(image.id);

  res.json(image);
}

// async function putImagenes(req, res) {
//   const { id } = req.params;

//   const { imagen } = req.body;

//   await Imagenes.update(
//     {
//       imagen,
//     },
//     {
//       where: { id: id },
//     }
//   );

//   const img = await Imagenes.findByPk(id);
//   res.json(img);
// }

async function postImagenes(req, res) {
  const { public_id, url } = req.body;
  try {
      await Imagen.create({
          id: public_id,
          imagen: url,
      });
      res.send('Imagen recibida');
  } catch (error) {
      console.log(error);
  }
}

module.exports = {
  getImagenes,
  //putImagenes,
  postImagenes,
  deleteImagenes,
};
