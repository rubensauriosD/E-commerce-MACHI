
const mercadopago = require('mercadopago');
const { YOUR_ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: YOUR_ACCESS_TOKEN
}); 

const checkoutPase=(req, res) => {
    // Crea un objeto de preferencia
   
  const itemsMercadoPago=req.body.items
    //const [ payer, setPayer] = useState({ nombre:"", apellido:"", codigo:"", telefono:"",  codigoPostal:"", calle:"", altura:"",  })    
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
        back_urls: {
            success: process.env.SUCCESS_MP ||"http://localhost:3000/#/successPayment",
            failure:  process.env.FAILURE_MP || "http://localhost:3000/#/failurePayment",
            pending:  process.env.PENDING_MP || "http://localhost:3000/#/pendingPayment",
          },
          auto_return: "approved",
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        
        const container = response.body
        return res.json(response.body.init_point);
       
      }).catch(function(error){
        res.status(404).json({error})
        console.log(error);
      });
    }

module.exports={
    checkoutPase
}
