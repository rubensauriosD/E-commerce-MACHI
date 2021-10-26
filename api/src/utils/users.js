const {Usuario} = require('../db')

async function getUsuario(req, res) 
{
    let users = await Usuario.findAll();

    try 
    {
        if (users) 
        {
            res.json(users);
        } 
        else 
        {
            return res.status(404).send('No hay usuarios existentes.')
        }
    } 
    catch (error) {
        return res.status(404);
    }
}

async function deleteUsuario(req, res) 
{
    const {id} = req.params;

    let user = await Usuario.findByPk(id)

    Usuario.destroy({
        where:
        {
            id:id
        }
    })

    res.json(user)
}

async function putUsuario(req, res) 
{
    const {id} = req.params;

    const {nombre, apellido, email, contraseña, tipo} = req.body;

    await Usuario.update(
        {
            nombre, apellido, email, contraseña, tipo
        },
        {
            where: {id:id}
        }
    )

    const user = await Usuario.findByPk(id)
    res.json(user)
}

async function postUsuario(req, res) 
{
    const {nombre, apellido, email, contraseña, tipo} = req.body;

    try 
    {
            const nuevoUser = await Usuario.create({
                nombre: nombre,
                apellido:apellido,
                email:email,
                contraseña:contraseña,
                tipo:tipo
            })

            res.json(nuevoUser)
    } 
    catch (error) 
    {
        console.log(error);
    }
}

module.exports = {
    getUsuario,
    putUsuario,
    postUsuario,
    deleteUsuario
};