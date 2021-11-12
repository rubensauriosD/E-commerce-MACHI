import { Typography } from "@mui/material";
import { useEffect } from "react";
import { sendMail } from "../../Redux/actions/cartAction";
import {useDispatch} from "react-redux";

export default function SuccesPayment() {
  const { datosFactura } = useSelector((state) => state);
  const dispatch=useDispatch()

  useEffect(()=>{
      setTimeout(()=>{
          window.close()
      },3000)
      dispatch(sendMail(datosFactura.data.payer, datosFactura.data.items))
    },[dispatch])

  return (
    <div>
      <h1>
        <Typography><p style={{alignItem: "center", marginTop: "40px"}}><h4>Tu Pago se procesó con Exito, te llegara un correo con los detalles.<br/> Muchas Gracias por tu compra</h4></p></Typography>
      </h1>
    </div>
  );
}
