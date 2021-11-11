import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function SuccesPayment() {
    useEffect(()=>{
        setTimeout(()=>{
            window.close()
        },3000)
    },[])
  return (
    <div>
      <h1>
        <Typography><p style={{alignItem: "center", marginTop: "40px"}}><h4>Tu Pago se procesó con Exito, te llegara un correo con los detalles.<br/> Muchas Gracias por tu compra</h4></p></Typography>
      </h1>
    </div>
  );
}
