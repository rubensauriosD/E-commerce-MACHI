import { Typography } from "@mui/material";
import { useEffect } from "react";
import { sendMail } from "../Redux/actions/cartAction";
import {useDispatch,useSelector} from "react-redux";
import { postFactura } from "../Redux/actions/facturaAction"
import { borrarCarritoDb } from "../Redux/actions/cartAction";

export default function SuccesPayment() {
  const { datosFactura } = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  useEffect(()=>{
        setTimeout(()=>{
            window.close()
        },5000)
  dispatch(postFactura(datosFactura.payer, datosFactura.items))
  dispatch(sendMail(datosFactura.payer, datosFactura.items));
  dispatch(borrarCarritoDb())
    },[dispatch, datosFactura])
  return (
    <div>
      <h1>
        <Typography><p style={{alignItem: "center", marginTop: "40px"}}><h4>Tu Pago se procesó con Exito, te llegara un correo con los detalles.<br/><br/> Muchas Gracias por tu compra</h4></p></Typography>
      </h1>
    </div>
  );
}
