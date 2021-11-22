import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { comprobanteSiEsUsuario } from '../Redux/actions/userAction';
import { getFacturasUsuario } from '../Redux/actions/facturaAction';
import { getProducts } from '../Redux/actions/productAction';
import { Link } from "react-router-dom"

function Compras({estado,total,fecha,productos}) {

  const [open, setOpen] = React.useState(false);
  let fechaNormal = fecha.substr(0,10);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{estado}</TableCell>
        <TableCell align="right">{total}</TableCell>
        <TableCell align="right">{fechaNormal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Reviews</TableCell>
                    {/* <TableCell align="right">Cantidad</TableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                {productos&&productos.map((producto, indice)=>{
                return(
                  <TableRow key={producto.id}>
                  <TableCell component="th" scope="row">
                    <Link style={{textDecoration:"none", color:"black"}} to={`/producto/${producto.id}`}>
                    {producto.nombre}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{producto.categoria}</TableCell>
                  <TableCell align="right">{producto.precio}</TableCell>
                    <TableCell align="right"><Link style={{textDecoration:"none",color:"black"}}  to="/CommentProduct">AddYourComment</Link></TableCell> 
                  {/* <TableCell align="right">{producto.cantidadDeProducto}</TableCell> */}
                </TableRow>
                )
                })
                }
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(()=>{
    dispatch(comprobanteSiEsUsuario(history))
    dispatch(getFacturasUsuario())
    dispatch(getProducts({}))
  },[dispatch,history])
  const facturas = useSelector(state => state.factura.FacturasUsuario)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            
            <TableCell >Historial de compras</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Precio total</TableCell>
            <TableCell align="right">Fecha de compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {facturas?facturas.map((factura) => (
              <Compras key={factura.id} 
                id={factura.id} 
                estado={factura.status} 
                cantidad={factura.ammount} 
                fecha={factura.createDate} 
                total={factura.total} 
                productos={factura.productos}
              />)                     
            ): <p>No hay compras realizadas</p>}  
        </TableBody>
      </Table>
    </TableContainer>
  );
}