import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from 'react';  
import{getFacturasAdmin, setEstado} from '../../Redux/actions/facturaAction'
import axios from 'axios';
import swal from 'sweetalert';
import FiltroEstado from "./FiltroEstado";

function Row({status, ammount, createDate, total, productos, nombreReceptor, id}) {
    //    const [open, setOpen] = React.useState(false);
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
            return dispatch(getFacturasAdmin({}))    
        }

        return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="right">{nombreReceptor}</TableCell>
            <TableCell align="center">{ammount}</TableCell>

            <FormControl>
            <InputLabel>Estado: {status}</InputLabel>
            <Select name='status'  className="levelAdminMaterialEdit" label="Estado" onChange={(e) => handleChangeEditar(e)} required align="right"> 
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
            {/* <TableRow>
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
                        {productos&&productos.map((historyRow) => (
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
            </TableRow> */}
        </React.Fragment>
        );
}

export default function EditarFacturas()
{
    var facturas = useSelector(state => state.factura.Facturas)
    var dispatch = useDispatch();


    return(
        <div>
            <div>
                <FiltroEstado dispatch={dispatch} setEstado={setEstado} getFacturasAdmin={getFacturasAdmin}/>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Comprador</TableCell>
                                <TableCell align="center">Cantidad Prod. </TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                            </TableRow>
                        </TableHead>

                    <TableBody>
                    {Array.isArray(facturas)&&facturas.map((fac) => 
                    (
                        <Row key={fac.id} id={fac.id} status={fac.status} ammount={fac.ammount}createDate={fac.createDate.substr(0,10)} total={fac.total} productos={fac.productos} nombreReceptor={fac.nombreReceptor}/>
                    ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>)
}