const app = require('express').Router()
const mercadopago = require('mercadopago');
const { YOUR_ACCESS_TOKEN } = process.env;



mercadopago.configurations.setAccessToken('APP_USR-4288979434416059-110414-ec5585f774fe9a73d06a47b32712775f-1012482719'); //ACA VA EL ACCES TOKEN DEL VENDEDOR!!

/*  mercadopago.configure({
    access_token: 'APP_USR-4288979434416059-110414-ec5585f774fe9a73d06a47b32712775f-1012482719'
  }); */ 

/* app.get('/', (req, res) =>{
    res.send('Bienvenido a Checkout');
}) */

app.post('/', (req, res) => {
    // Crea un objeto de preferencia
    
    let preference = {
        items: [
          {
            //category_id: req.body.id, // 1235641348
            title: req.body.nombre, // nombre del producto
            unit_price: parseInt(req.body.precio),
            quantity: parseInt(req.body.cantidad), //esto hay q crearlo
            currency_id: 'ARS'
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        
        console.log(response.body);
        res.redirect(response.body.init_point);
       
      }).catch(function(error){
        console.log(error);
      });
    });



module.exports = app;