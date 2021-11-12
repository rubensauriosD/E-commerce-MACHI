//const { Factura, Producto } = require("../db");
const  transporter  = require("../config/mailer");



const successMail = async (req,res) =>{
    const {payer, items } = req.body;
    const itemsP = items.map(item => item.title);
    const itemsS = itemsP.join();
    const total = items.reduce((total, item) => total + item.unit_price * item.quantity , 0);

    try{

        await transporter.sendMail({
            from: '"Machi" <Machiwebsite@gmail.com>', // sender address
            to: `${payer.mail}`,
            subject: "Compra aprobada", // Subject line
            /* text: "Compra aprobada", // plain text body */
            html: `
                <h1>Compra aprobada</h1>
                <p>Su pedido  ${itemsS} con un valor de $ ${total} está pago</p>
                <p>Un miembro del grupo Machi se comunicará con usted a la brevedad</p>
                <p>Gracias por comprar en Machi</p>
            `, 
        });
        
        res.status(200).send("mail enviado")
    }
    catch(error){
      console.log(error)
      return res.status(404).send("no se pudo enviar el mail")
    }
  };

  module.exports = {
    successMail,
  };