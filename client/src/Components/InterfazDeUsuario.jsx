import avatar from "../Imagenes/img/avatarAnonimo.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useDispatch} from "react-redux"
import {cerrarSesion} from "../Redux/actions/action"
import { Button, CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
export default function InterfazDeUsuario({ datosUsuario }) {
  const dispatch=useDispatch()
  return (
    <div>
      <Card sx={{ maxWidth: 345, boxShadow:{sm:"5px 5px 2px #355a1d "} }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={avatar}
            alt="Sin imagen de perfil"
          />
          <CardContent sx={{backgroundColor:"#4da45f"}}>
            <Typography gutterBottom variant="h5" component="div">
            {datosUsuario.nombre + " " + datosUsuario.apellido}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {datosUsuario.email} <br /> {datosUsuario.tipo}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Button color="warning" variant="contained" onClick={()=>dispatch(cerrarSesion())}>Cerrar Sesion</Button>
      {datosUsuario.tipo ==="admin"&&<Link to="/admin"><Button>Ir a la Interfaz de Administrador</Button></Link>}
    </div>
  );
}