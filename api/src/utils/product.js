const {Producto} = require('../db')

async function getProductos(req, res) 
{
    let product = await Producto.findAll();

    try 
    {
        if (product) 
        {
            res.json(product);
        } 
        else 
        {
            return res.status(404).send('No hay productos existentes.')
        }
    } 
    catch (error) {
        return res.status(404);
    }
}

async function deleteProductos(req, res) 
{
    const {id} = req.params;

    let product = await Producto.findByPk(id)

    Producto.destroy({
        where:
        {
            id:id
        }
    })

    res.json(product)//devuelvo el producto eliminado
}

async function putProductos(req, res) 
{
    const {id} = req.params;

    const {nombre,imagen,precio,descripcion,disponibilidad} = req.body;

    await Producto.update(
        {
            nombre,imagen,precio,descripcion,disponibilidad
        },
        {
            where: {id:id}
        }
    )

    const product = await Producto.findByPk(id)
    res.json(product)
}

async function postProductos(req, res) 
{
    const {nombre,imagen,precio,descripcion,disponibilidad} = req.body;

    try 
    {
            const nuevoProduct = await Producto.create({
                nombre:nombre,
                imagen:imagen,
                precio:precio,
                descripcion:descripcion,
                disponibilidad: disponibilidad
            })

            res.json(nuevoProduct)
    } 
    catch (error) 
    {
        console.log(error);
    }
}

module.exports = {
    getProductos,
    putProductos,
    postProductos,
    deleteProductos
};