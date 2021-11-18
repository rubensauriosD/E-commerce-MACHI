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
        disponibilidad: productos.disponibilidad,  
        cantidadDeProducto: productos.cantidadDeProducto
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
             
            <ol>
                {
                     productos.productos?.map((producto, i) => {
                        return( 
                            
                        <li key={producto.id}>
                        <div className="ordererAdminEdit">
                                <div>

                                {/* <div className="imagenAdminDiv"> */}   
                                    <img className="imagenAdmin" src={producto.imagen} alt="imagen producto"/>
                                <TextField  className="levelAdminMaterialEditimg" onChange={(e) => {setImagen(e.target.files[0])}} name="imagen"  type="file" variant="filled" color="success"/>
                                {/* </div>  */}   
                                
                             
                                <TextField className="levelAdminMaterialEdit" placeholder={producto.nombre} onChange={(e) => handleChangeEditar(e)} name="nombre" type="text" label={producto.nombre} variant="filled" color="success"/>

                                <TextField className="levelAdminMaterialEdit" placeholder={producto.precio} onChange={(e) => handleChangeEditar(e)}  name="precio" type="number" label={producto.precio} variant="filled" color="success"/>
                                
                                <TextField className="levelAdminMaterialEdit" placeholder={producto.descripcion} onChange={(e) => handleChangeEditar(e)}  name="descripcion" type="text" label={producto.descripcion} variant="filled" color="success"/>

                                <TextField className="levelAdminMaterialEdit" placeholder={producto.cantidadDeProducto} onChange={(e) => handleChangeEditar(e)}  name="cantidadDeProducto" type="number" label={producto.cantidadDeProducto} variant="filled" color="success"/>
 
                                <FormControl>
                                <InputLabel>Disponibilidad: {producto.disponibilidad? 'Disponible' : 'No disponible'}</InputLabel>
                                <Select name='disponibilidad' className="levelAdminMaterialEdit" label="Disponibilidad" onChange={(e) => handleChangeEditar(e)} value={inputsEditar.disponibilidad} required>
                                    <MenuItem value="true">Disponible</MenuItem>
                                    <MenuItem value="false" >No Disponible</MenuItem>
                                </Select>
                                </FormControl>
                                

                                <FormControl>    
                                <InputLabel id="dos">Categoria: {producto.categoria}</InputLabel>
                                <Select labelId="dos" name='categoria' className="levelAdminMaterialEdit" label="Categoria" onChange={(e) => handleChangeEditar(e)} value={inputsEditar.categoria} required>
                                    <MenuItem value="Cajones y Cultivos">Cajones y Cultivos</MenuItem>
                                    <MenuItem value="Plantines y Semillas" >Plantines y Semillas</MenuItem>
                                    <MenuItem value="Composteras">Composteras</MenuItem>
                                    <MenuItem value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</MenuItem>
                                    <MenuItem value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</MenuItem>
                                </Select>
                                </FormControl>
                                <Button className="adminButtonED" sx={{margin: "4px", marginLeft: "16px" }} id={producto.id} name={producto.nombre}  onClick={(e) => {editar(e)}} variant="contained" color="success" type="submit">Editar</Button>         
                                <Button className="adminButtonED" sx={{margin: "4px"}} id={producto.id} name={producto.nombre}  onClick={(e) => {borrar(e)}} variant="contained" color="error" type="submit">X</Button>     
                                       
                                
                            </div>  
                        </div>          
                        </li>)
                    }) 
                }   
            </ol>
        </div>
    )

}