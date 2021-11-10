import './PieDePaginaStyle.css';
import {Container, Grid, Box, Link} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from "../../logo.png";
import greenTech from "../../imgEmpresas/greenTech.jpg";
import Ecolink from "../../imgEmpresas/Ecolink.png";
import GobiernoCordoba from "../../imgEmpresas/GobiernoCordoba.png";
import RotaryClub from "../../imgEmpresas/Rotary-Club-Cordoba.jpg";
import UniversidadCatolica from "../../imgEmpresas/UniversidadCatolica.png";
import siglo21 from "../../imgEmpresas/siglo21.jpg";
import Ingemax from "../../imgEmpresas/Ingemax.png"


export default function PieDePagina(){
    return (
        <div className="footer">
            <Box px={{xs : 3, sm: 10}} 
                 py={{xs: 5, sm: 10}} 
                 className="BoxContenedora-footer">
                <Container className="container-footer">
                    <Grid container spacing="110" >
                        <div className="grid-interno">
                            <Box><img src={logo} alt="imagen" width="140px"/></Box>
                            {/* <Box><Link href="/contact" color="inherit"> Contacto</Link></Box> */}
                            
                        </div>
                        <div className="grid-interno">
                            <Box className="innerBox-footer" borderBottom={1}>Secciones</Box>
                            <Box className="innerBox-footer"><Link href="/contact" color="inherit" style={{textDecoration: "none" }}> Contacto</Link></Box>
                            <Box className="innerBox-footer"><Link href="/nosotros" color="inherit" style={{textDecoration: "none" }}> Nosotros</Link></Box>
                        </div>
                        <div className="grid-interno">
                            <Box className="innerBox-footer" borderBottom={1}>Nuestras Redes</Box>
                            <a className="innerBox-footer-red" href="https://instagram.com/machi_arg?utm_medium=copy_link" target="_blanck" color="inherit" style={{textDecoration: "none"}}><InstagramIcon style={{color: '#C32AA3', fontSize: '50px'}}/></a>
                            <a className="innerBox-footer-red" href="https://www.facebook.com/Elmachi/?ref=pages_you_manage" target="_blanck"  color="inherit" style={{textDecoration: "none"}}><FacebookIcon style={{color: 'blue', fontSize: '50px'}}/></a>
                            <a className="innerBox-footer-red" href="https://wa.me/543512900724?text=Hola%20Machi,%20tengo%20una%20consulta!%20" target="_blanck" color="inherit" style={{textDecoration: "none"}}><WhatsAppIcon style={{color: 'green', fontSize: '50px'}}/></a>
                        </div>
                        <div className="grid-interno">
                            <Box className="innerBox-footer" borderBottom={1}>Confian en nosotros</Box>
                            <Box className="innerBox-footer-img">
                                <img className="imgFooter" src={greenTech} alt="greentech" />
                                <img className="imgFooter" src={Ecolink} alt="Ecolink" />
                                <img className="imgFooter" src={GobiernoCordoba} alt="GobiernoCordoba" />
                                <img className="imgFooter" src={RotaryClub} alt="RotaryClub" />
                                <img className="imgFooter" src={UniversidadCatolica} alt="UniversidadCatolica" />
                                <img className="imgFooter" src={siglo21} alt="siglo21" />
                                <img className="imgFooter" src={Ingemax} alt="Ingemax" />
                            </Box>
                        </div>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}