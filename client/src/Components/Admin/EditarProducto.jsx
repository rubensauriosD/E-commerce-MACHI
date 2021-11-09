 import { useState } from 'react';  
 import { useDispatch, useSelector } from 'react-redux';  
 import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
 import axios from 'axios';
 import { getProductsAdmin } from '../../Redux/actions/productAction';     
 import swal from 'sweetalert';
            
            
            
export default function EditarProducto(){   
    
    
    const dispatch = useDispatch();
    
    var productos = useSelector(state => state.productos.productsAdmin);
    
    const [inputsEditar, setInputsEditar] = useState({
        nombre: productos.nombre,
        precio: productos.precio,
        descripcion: productos.descripcion,
        imagen: productos.imagen,
        categoria: productos.categoria,
        disponibilidad: productos.disponibilidad  
    })
    const [imagen, setImagen] = useState('')
       
    function handleChangeEditar(e) {
        console.log(e.target.value)
        setInputsEditar({
            ...inputsEditar,
            [e.target.name]: e.target.value
        })
    } 

    function borrar(e) { 
        axios.delete(`/productos/${e.target.id}`);
        swal(`El producto ${e.target.name} fue eliminado con exito`);
        dispatch(getProductsAdmin())
    }

    function editar(e) {
        e.preventDefault(); 
        if(imagen !== '') {
            const formData = new FormData()
            formData.append("file", imagen)
            formData.append("upload_preset", "tpvdkdav")

            axios.post("https://api.cloudinary.com/v1_1/mau-ar/image/upload", formData)
            .then((response)=>{
                return response.data
            })
            .then(({url}) => {
                inputsEditar.imagen = url;
                axios.put(`/productos/${e.target.id}`, (inputsEditar));
                swal(`El producto ${e.target.name} fue modificado con exito`)
                dispatch(getProductsAdmin())
            })
        }else{
            axios.put(`/productos/${e.target.id}`, inputsEditar);
            swal(`El producto ${e.target.name} fue modificado con exito`)
            dispatch(getProductsAdmin())
        }
    }



    return (
        <div className="editarProductos">
            <h3>Editar Productos</h3> 
            <ol>
                {
                     productos.productos?.map((producto, i) => {
                        return( 
                            
                        <li key={producto.id}>
                        <div className="ordererAdmin">        
                                <div className="imagenAdminDiv">    
                                    <img className="imagenAdmin" src={producto.imagen} alt="imagen producto"/>
                                <TextField  onChange={(e) => {setImagen(e.target.files[0])}} name="imagen"  type="file" variant="filled" color="success"/><br/><br/>
                                </div>    
                                <div>
                             
                                <TextField className="levelAdminMaterial" placeholder={producto.nombre} onChange={(e) => handleChangeEditar(e)} value={inputsEditar.nombre} name="nombre" type="text" label="Nombre" variant="filled" color="success"/><br/><br/>

                                <TextField className="levelAdminMaterial" placeholder={producto.precio} onChange={(e) => handleChangeEditar(e)} value={inputsEditar.precio} name="precio" type="number" label="Precio" variant="filled" color="success"/><br/><br/>
                                
                                <TextField className="levelAdminMaterial" placeholder={producto.descripcion} onChange={(e) => handleChangeEditar(e)} value={inputsEditar.descripcion} name="descripcion" type="text" label="Descripcion" variant="filled" color="success"/><br/><br/>

                                <FormControl>
                                <InputLabel>Disponibilidad Actual: {producto.disponibilidad? 'Disponible' : 'No disponible'}</InputLabel>
                                <Select name='disponibilidad' className="levelAdminMaterial" label="Disponibilidad" onChange={(e) => handleChangeEditar(e)} value={inputsEditar.disponibilidad} required>
                                    <MenuItem value="true">Disponible</MenuItem>
                                    <MenuItem value="false" >No Disponible</MenuItem>
                                </Select>
                                </FormControl><br/><br/>

                                <FormControl>    
                                <InputLabel id="dos">Categoria Actual: {producto.categoria}</InputLabel>
                                <Select labelId="dos" name='categoria' className="levelAdminMaterial" label="Categoria" onChange={(e) => handleChangeEditar(e)} value={inputsEditar.categoria} required>
                                    <MenuItem value="Cajones y Cultivos">Cajones y Cultivos</MenuItem>
                                    <MenuItem value="Plantines y Semillas" >Plantines y Semillas</MenuItem>
                                    <MenuItem value="Composteras">Composteras</MenuItem>
                                    <MenuItem value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</MenuItem>
                                    <MenuItem value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</MenuItem>
                                </Select>
                                </FormControl><br/><br/>

                                <div >
                                    <Button id={producto.id} name={producto.nombre} sx={{margin: '25px'}} onClick={(e) => {editar(e)}} variant="contained" color="success" type="submit">Editar</Button>         
                                    <Button id={producto.id} name={producto.nombre} sx={{margin: '25px'}} onClick={(e) => {borrar(e)}} variant="contained" color="success" type="submit">Eliminar</Button>         
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