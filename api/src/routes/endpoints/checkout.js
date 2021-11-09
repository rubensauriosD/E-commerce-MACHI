const app = require('express').Router()
const mercadopago = require('mercadopago');
const { YOUR_ACCESS_TOKEN } = process.env;


mercadopago.configure({
    access_token: YOUR_ACCESS_TOKEN
}); 

app.post('/', (req, res) => {
    // Crea un objeto de preferencia
    
console.log("el numero es: ",parseInt(req.body.payer.altura))
    console.log("lo que llega por body: ",req.body.items)
   
  const itemsMercadoPago=req.body.items
    //const [ payer, setPayer] = useState({ nombre:"", apellido:"", codigo:"", telefono:"",  codigoPostal:"", calle:"", altura:"",  })    
  console.log("Aca llegan los datos del item quantity " + itemsMercadoPago.map(el => el))
    let preference = {
         items: itemsMercadoPago.map(item=>({ 
          title: item.title, // nombre del producto
          unit_price: parseInt(item.unit_price),
          quantity: parseInt(item.quantity), //esto hay q crearlo
          currency_id: 'ARS'
         })
         ),
        payer: {
          phone: { area_code: req.body.payer.codigo, number: parseInt(req.body.payer.telefono) },
          address: { zip_code: req.body.payer.codigoPostal, street_name: req.body.payer.calle, street_number: parseInt(req.body.payer.altura) },
          email: req.body.payer.email,
          identification: { number: req.body.payer.codigo, type: req.body.payer.telefono },
          name: req.body.payer.nombre,
          surname: req.body.payer.apellido,
          date_created: null,
          last_purchase: null
        },
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        
        console.log(response.body);
        res.json(response.body.init_point);
       
      }).catch(function(error){
        console.log(error);
      });
    });



module.exports = app;
        //  [
        //   {
        //     //category_id: req.body.id, // 1235641348
        //     title: req.body.title, // nombre del producto
        //     unit_price: parseInt(req.body.unit_price),
        //     quantity: parseInt(req.body.quantity), //esto hay q crearlo
        //     currency_id: 'ARS'
        //   }
        // ], 