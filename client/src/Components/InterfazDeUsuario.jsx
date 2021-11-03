import avatar from "../Imagenes/img/avatarAnonimo.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
export default function InterfazDeUsuario({ datosUsuario }) {
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
      <Button color="warning" variant="contained">Cerrar Sesion</Button>
    </div>
  );
}
/*
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
*/
