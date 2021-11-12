import * as React from 'react';
import { useDispatch } from 'react-redux';
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

function Compras() {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(()=>{
    dispatch(comprobanteSiEsUsuario(history))
  })

  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          ID CARRITO
        </TableCell>
        <TableCell align="right">ESTADO</TableCell>
        <TableCell align="right">PRECIO TOTAL</TableCell>
        <TableCell align="right">FECHA DE COMPRA</TableCell>
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
                    <TableCell>Descripcion</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Precio individual</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapeo de productos */}
                    <TableRow >
                      <TableCell component="th" scope="row">
                        Producto
                      </TableCell>
                      <TableCell>descripcion</TableCell>
                      <TableCell align="right">categoria</TableCell>
                      <TableCell align="right"> 
                        precio
                      </TableCell>
                      <TableCell align="right">cantidad</TableCell>
                    </TableRow>
                  {/* ))} */}
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
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Historial de compras</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Precio total</TableCell>
            <TableCell align="right">fecha de compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* Mapeo de ordenes de compra */}
            <Compras />
        </TableBody>
      </Table>
    </TableContainer>
  );
}