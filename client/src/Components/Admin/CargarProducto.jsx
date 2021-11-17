import { useState } from 'react';  
import { useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useDispatch } from 'react-redux';
import { postProduct, getProductsAdmin } from '../../Redux/actions/productAction';
import swal from 'sweetalert';
import axios from 'axios';

export default function CargarProducto(){

    const dispatch= useDispatch();

    const [inputs, setInputs] = useState({
        nombre: '',
        precio:'',
        imagen:'',
        descripcion: '',
        categoria: '',
        disponibilidad:false  
    })
    const [imagen, setImagen] = useState('')
  
    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() =>{
        dispatch(getProductsAdmin());
    },[dispatch])

    const subirProducto = (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("file", imagen)
        formData.append("upload_preset", "tpvdkdav")
    
        axios.post("https://api.cloudinary.com/v1_1/mau-ar/image/upload", formData)
        .then((response)=>{
            return response.data
        })
        .then(({url}) => {
            inputs.imagen = url;
            return dispatch(postProduct(inputs))
        })
        .then(() => {
            setInputs({
                nombre: '',
                precio:'',
                imagen:'',
                descripcion: '',
                categoria: '',
                disponibilidad:false,
                cantidadDeProducto:0
            })
            swal('El producto fue creado exitosamente')
            return dispatch(getProductsAdmin());
        })
        .catch((err) => {
            console.log(err)
        })
       
    }

   /*  function limpiarInput(){
        setInputs({
        nombre: '',
        precio:'',
        descripcion: '',
        categoria: '',
        disponibilidad:false
    })} */
    

    return ( 
        <div className="productoAdmin">
                <h2>Cargar Producto</h2><br/>
                   <form >
                        <TextField className="levelAdminMaterial" onChange={(e) => handleChange(e)} name="nombre" type="text" label="Nombre" value={inputs.nombre} variant="filled" color="success"/><br/><br/>
                    
                        <TextField className="levelAdminMaterial" onChange={(e) => handleChange(e)} name="precio" type="text" label="Precio" value={inputs.precio} variant="filled" color="success"/><br/><br/>

                        <TextField className="levelAdminMaterial" onChange={(e) => handleChange(e)} name="descripcion" type="text" label="Descripcion" value={inputs.descripcion} variant="filled" color="success"/><br/><br/>

                        <FormControl>
                            <InputLabel id="uno">Disponibilidad</InputLabel>
                            <Select labelId="uno" name='disponibilidad' className="levelAdminMaterial" label="Disponibilidad" onChange={(e) => handleChange(e)}  value={inputs.disponibilidad} required>
                                <MenuItem value="true">Disponible</MenuItem>
                                <MenuItem value="false" >No Disponible</MenuItem>
                            </Select>
                        </FormControl><br/><br/>
                        <FormControl>
                            <TextField className="levelAdminMaterial" label="Cantidad del producto" type="number" name="cantidadDeProducto" variant="filled" onChange={(e) => handleChange(e)} value={inputs.cantidadDeProducto} color="success" required/>
                        </FormControl><br/><br/>
                        <FormControl>    
                            <InputLabel id="dos">Categoria</InputLabel>
                            <Select labelId="dos" name='categoria' className="levelAdminMaterial" label="Categoria" onChange={(e) => handleChange(e)}  value={inputs.categoria} required>
                                <MenuItem value="Cajones y Cultivos">Cajones y Cultivos</MenuItem>
                                <MenuItem value="Plantines y Semillas" >Plantines y Semillas</MenuItem>
                                <MenuItem value="Composteras">Composteras</MenuItem>
                                <MenuItem value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</MenuItem>
                                <MenuItem value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</MenuItem>
                            </Select>
                        </FormControl><br/><br/>
                        
                        <TextField className="levelAdminMaterial" name="imagen" type="file" variant="filled" color="success" onChange={(e) => {setImagen(e.target.files[0])}  }  />
                                   
                    </form> 
                   
                <Button sx={{justifySelf:"center", margin: '25px'}} variant="contained" color="success" type="submit" onClick={subirProducto}>Crear</Button>         
                
        </div>
    )

        
                    
}            
