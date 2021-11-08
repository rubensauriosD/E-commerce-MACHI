import './PieDePaginaStyle.css';
import {Container, Grid, Box, Link} from '@mui/material'


export default function PieDePagina(){
    return (
        <div>
            <Container maxWidth="lg">
                <Grid container spacing="5">
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>
                           <Link href="/contact" color="inherit"> Contacto</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}