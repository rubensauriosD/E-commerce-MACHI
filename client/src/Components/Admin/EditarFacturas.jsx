import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import PropTypes from 'prop-types';
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
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from 'react';  
import{getFacturasAdmin} from '../../Redux/actions/facturaAction'
import axios from 'axios';
import swal from 'sweetalert';

function Row({status, ammount, createDate, total, productos, id}) {
        const [open, setOpen] = React.useState(false);
        const [estado, setEstado] = useState('');
        const dispatch = useDispatch();

        function handleChangeEditar(e) 
        {
            setEstado({
                [e.target.name]: e.target.value
            })
        } 

        async function editar(e) {
            e.preventDefault(); 
            await axios.put(`/factura/${e.target.id}`, estado);
            swal(`La factura con id ${e.target.id} fue modificada con exito`)
            return dispatch(getFacturasAdmin())    
        }

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
            <TableCell align="left">{ammount}</TableCell>

            <FormControl>
            <InputLabel>Estado: {status}</InputLabel>
            <Select name='status' className="levelAdminMaterialEdit" label="Estado" onChange={(e) => handleChangeEditar(e)} required>
            <MenuItem value="creada">Creada</MenuItem>
            <MenuItem value="procesando">Procesando</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
            <MenuItem value="completa">Completa</MenuItem>
            </Select>
            </FormControl>                    

            <TableCell align="right">{total}</TableCell>
            <TableCell align="right">{createDate}</TableCell>
            <Button className="adminButtonED" sx={{margin: "4px", marginLeft: "16px" }} id={id} onClick={(e) => {editar(e)}} variant="contained" color="success" type="submit">Editar</Button> 

            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                    Productos
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((historyRow) => (
                        <TableRow key={historyRow.id}>
                            <TableCell component="th" scope="row">
                            {historyRow.nombre}
                            </TableCell>
                            <TableCell>{historyRow.categoria}</TableCell>
                            <TableCell align="right">{historyRow.precio}</TableCell>
                            <TableCell align="right">
                                {historyRow.cantidadDeProducto}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
            </TableRow>
        </React.Fragment>
        );
}

export default function EditarFacturas()
{
    var facturas = useSelector(state => state.factura.Facturas)
    var dispatch = useDispatch();

    console.log(facturas)

    return(            
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">

                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Cantidad</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>

                <TableBody>
                {Array.isArray(facturas)&&facturas.map((fac) => (
                    <Row key={fac.id} id={fac.id} status={fac.status} ammount={fac.ammount}createDate={fac.createDate} total={fac.total} productos={fac.productos}/>
                ))}
                </TableBody>
                </Table>
            </TableContainer>
    </div>)
}