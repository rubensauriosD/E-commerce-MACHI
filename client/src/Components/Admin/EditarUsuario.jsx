import { useState,useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from 'axios';
import { getUsers } from '../../Redux/actions/userAction';     
import swal from 'sweetalert';

export default function EditarProducto(){      
    const dispatch = useDispatch();
    var usuarios = useSelector(state => state.usuario.Users);
    const [inputsTipo, setinputsTipo] = useState('')

    useEffect(() =>{
        dispatch(getUsers());
    },[dispatch])

    function handleChangeEditar(e) {
        setinputsTipo({
            [e.target.name]: e.target.value
        })
    }

    async function borrar(e) { 
        await axios.delete(`/usuarios/${e.target.id}`);
        swal(`El usuario ${e.target.name} fue eliminado con exito`);
        return dispatch(getUsers())
    }

    async function editar(e) {
        await axios.put(`/usuarios/${e.target.id}`, inputsTipo);
        swal(`El usuario ${e.target.name} fue editado con exito`);
        dispatch(getUsers())
    }

return (
    <div className="editarProductos">
    <ol>
        {
            usuarios?.map((usuario, i) => {
                return( 
                <li key={usuario.id}>
                <div className="ordererAdmin"> 

                    <div>
                        <TextField className="levelAdminMaterialUser"  value={usuario.nombre} label="Nombre" name="nombre" type="text" variant="filled" color="success"/>

                        <TextField className="levelAdminMaterialUser" value={usuario.apellido} label="Apellido" name="apellido" type="text"variant="filled" color="success"/>
                        
                        <TextField className="levelAdminMaterialUser" value={usuario.email} name="email" label="Email" type="text" variant="filled" color="success"/>

                        <FormControl>    
                        <InputLabel id="dos">Tipo Actual: {usuario.tipo}</InputLabel>
                        <Select labelId="dos" name='tipo' className="levelAdminMaterialUser" label="Tipo" value={inputsTipo} onChange={(e) => handleChangeEditar(e)} required>
                            <MenuItem value="user">Usuario</MenuItem>
                            <MenuItem value="admin" >Admin</MenuItem>
                        </Select>
                        </FormControl>
                        <Button className="adminButtonED" id={usuario.id} name={usuario.nombre} sx={{margin: '7px', marginLeft: "16px" }} onClick={(e) => {editar(e)}} variant="contained" color="success" type="submit">Editar</Button>         
                        <Button className="adminButtonED" id={usuario.id} name={usuario.nombre} sx={{margin: "7px"}} onClick={(e) => {borrar(e)}} variant="contained" color="error" type="submit">X</Button>         
                    </div>  
                </div>          
                </li>)
            }) 
        }   
    </ol>
</div>
    )
}