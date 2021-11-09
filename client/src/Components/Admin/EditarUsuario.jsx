import { useState,useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from 'axios';
import { getUsers } from '../../Redux/actions/action';     
import swal from 'sweetalert';

export default function EditarProducto(){      
    const dispatch = useDispatch();
    var usuarios = useSelector(state => state.Users);
    const [inputsTipo, setinputsTipo] = useState('')

    useEffect(() =>{
        dispatch(getUsers());
    },[dispatch])

    function handleChangeEditar(e) {
        setinputsTipo({
            [e.target.name]: e.target.value
        })
    }

    function borrar(e) { 
        axios.delete(`/usuarios/${e.target.id}`);
        swal(`El usuario ${e.target.name} fue eliminado con exito`);
        return dispatch(getUsers())
    }

    function editar(e) {
        axios.put(`/usuarios/${e.target.id}`, inputsTipo);
        swal(`El usuario ${e.target.name} fue editado con exito`);
        dispatch(getUsers())
    }

return (
    <div className="editarProductos">
    <h3>Editar Usuarios</h3> 
    <ol>
        {
            usuarios?.map((usuario, i) => {
                return( 
                <li key={usuario.id}>
                <div className="ordererAdmin"> 

                        <div>
                        <TextField className="levelAdminMaterial"  value={usuario.nombre} label="Nombre" name="nombre" type="text" variant="filled" color="success"/><br/><br/>

                        <TextField className="levelAdminMaterial" value={usuario.apellido} label="Apellido" name="apellido" type="text"variant="filled" color="success"/><br/><br/>
                        
                        <TextField className="levelAdminMaterial" value={usuario.email} name="email" label="Email" type="text" variant="filled" color="success"/><br/><br/>

                        <FormControl>    
                        <InputLabel id="dos">Tipo Actual: {usuario.tipo}</InputLabel>
                        <Select labelId="dos" name='tipo' className="levelAdminMaterial" label="Tipo" onChange={(e) => handleChangeEditar(e)} required>
                            <MenuItem value="user">Usuario</MenuItem>
                            <MenuItem value="admin" >Admin</MenuItem>
                        </Select>
                        </FormControl><br/><br/>

                        <div >
                            <Button id={usuario.id} name={usuario.nombre} sx={{margin: '25px'}} onClick={(e) => {editar(e)}} variant="contained" color="success" type="submit">Editar</Button>         
                            <Button id={usuario.id} name={usuario.nombre} sx={{margin: '25px'}} onClick={(e) => {borrar(e)}} variant="contained" color="success" type="submit">Eliminar</Button>         
                        </div>
                    </div>  
                </div>          
                </li>)
            }) 
        }   
    </ol>
</div>
    )
}