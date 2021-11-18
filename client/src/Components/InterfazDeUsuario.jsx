import avatar from "../Imagenes/img/avatarAnonimo.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, CardActionArea } from "@mui/material";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {cerrarSesion} from "../Redux/actions/userAction"
import { removerAlCerrarSesion } from "../Redux/actions/cartAction"
export default function InterfazDeUsuario({ datosUsuario }) {
  const dispatch=useDispatch()
  const history=useHistory()
  const redirectToAdmin=()=>{
    history.push("/Admin")
  }
  const redirectTocart=()=>{
    history.push("/cart")
  }
  const cerradoDeSesion=()=>{
    dispatch(cerrarSesion())
    dispatch(removerAlCerrarSesion())
  }
  const redirectToReset=()=>{
    history.push("/reset")
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, boxShadow: { sm: "5px 5px 2px #355a1d " } }}>
        <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={avatar}
          alt="Sin imagen de perfil"
        />
        </CardActionArea>
        <CardContent sx={{ backgroundColor: "#4da45f" }}>
          <Typography gutterBottom variant="h5" component="div">
            {datosUsuario.nombre}  {datosUsuario.apellido && datosUsuario.apellido}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {datosUsuario.email} <br /> {datosUsuario.tipo}
          </Typography>
          <Button color="warning" onClick={cerradoDeSesion} variant="contained">
            Cerrar Sesion
          </Button>
          <Button color="warning" onClick={redirectToReset} variant="contained">
            Resetear Contraseña
          </Button>
          {datosUsuario.tipo === "admin" && (
            <Button
              color="primary"
              onClick={redirectToAdmin}
              variant="contained"
            >
              Ir a interfaz de Administrador
            </Button>
          )}
          {datosUsuario.tipo === "user" && (
            <Button
              onClick={redirectTocart}
              color="primary"
              variant="contained"
            >
              <ShoppingCartIcon />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
