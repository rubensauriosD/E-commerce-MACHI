const app = require('express').Router()
const mercadopago = require('mercadopago');
const { YOUR_ACCESS_TOKEN } = process.env;


mercadopago.configure({
    access_token: YOUR_ACCESS_TOKEN
}); 


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