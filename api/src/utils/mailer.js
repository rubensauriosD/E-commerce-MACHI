const { Factura, Producto } = require("../db")



export const successMail = async (req,res) =>{
    const {mail} = req.body;
    try{

        await transporter.sendMail({
            from: '"Machi" <Machiwebsite@gmail.com>', // sender address
            to: `${mail}`, // list of receivers
            subject: "Compra aprobada", // Subject line
            html: <div>
                <h1>Compra aprobada</h1>
                <p>Su pedido {Factura.id} con un valor de {Factura.total} está pago</p>
                <p>Un miembrod el grupo Machi se comunicará conusted a la brevedad</p>
                <p>Gracias por comprar en Machi</p>
            </div>, // html body
        });
        
        res.status(200).send("mail enviado")
    }
    catch(error){
      console.log(error)
      return res.status(404).send("no se pudo enviar el mail")
    }
  };