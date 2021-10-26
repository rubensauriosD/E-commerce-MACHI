const {Imagenes} = require('../db')

async function getImagenes(req, res) 
{
    let image = await Imagenes.findAll();

    try 
    {
        if (image) 
        {
            res.json(image);
        } 
        else 
        {
            return res.status(404).send('No hay imagenes existentes.')
        }
    } 
    catch (error) {
        return res.status(404);
    }
}

async function deleteImagenes(req, res) 
{
    const {id} = req.params;

    let image = await Imagenes.findByPk(id)

    Imagenes.destroy({
        where:
        {
            id:id
        }
    })

    res.json(image)
}

async function putImagenes(req, res) 
{
    const {id} = req.params;

    const {imagen} = req.body;

    await Imagenes.update(
        {
            imagen
        },
        {
            where: {id:id}
        }
    )

    const img = await Imagenes.findByPk(id)
    res.json(img)
}

async function postImagenes(req, res) 
{
    const {imagen} = req.body;

    try 
    {
            const nuevoImg = await Imagenes.create({
                imagen:imagen
            })

            res.json(nuevoImg)
    } 
    catch (error) 
    {
        console.log(error);
    }
}

module.exports = {
    getImagenes,
    putImagenes,
    postImagenes,
    deleteImagenes
};