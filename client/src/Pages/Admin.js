import React from "react";
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getProducts, deleteProduct, putProduct, getImages, deleteImage, postImage, postProduct} from '../Redux/actions/action';
import axios from 'axios'

const Admin = () => {
    var productos = useSelector(state => state.Products);
    var imagen = useSelector(state => state.Images);
    const [inputs, setInputs] = useState({
        nombre: '',
        precio:'',
        descripcion: '',
        categoria: '',
        imagen:'',
        disponibilidad:false  
    })
    const [inputsEditar, setInputsEditar] = useState({
        nombre: '',
        precio:'',
        descripcion: '',
        categoria: '',
        imagen:'',
        disponibilidad:''  
    })
    const [img, setImg] = useState('')
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(getProducts());
        dispatch(getImages());
    },[])

    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    } 

    function handleChangeImagen(e) {
        setImg(e.target.value)
    } 

    function handleChangeEditar(e) {
        setInputsEditar({
            ...inputsEditar,
            [e.target.name]: e.target.value
        })
    } 

    function borrar(e) {    
        axios.delete(`http://localhost:3001/productos/${e.target.id}`)
    }

    function editar(e) {    
        axios.put(`http://localhost:3001/productos/${e.target.id}`, inputsEditar)
    }

    return (
        <div>
            <h1>Admin</h1>
        
            <form >
                <h3>Producto</h3>
                <label>Nombre</label>
                <input type='text' name='nombre' onChange={(e) => handleChange(e)} required/>
                
                <label>Precio</label>
                <input type='number' name='precio' onChange={(e) => handleChange(e)} required/>

                <label>Descripcion</label>
                <input type='text' name='descripcion' onChange={(e) => handleChange(e)} />

                <label>Imagen</label>
                <input type='file' name='imagen' onChange={(e) => handleChange(e)}/>

                <label>Disponibilidad</label>
                <select name='disponibilidad' onChange={(e) => handleChange(e)} required>
                <option value='true'>Disponible</option>     
                <option value='false'>No Disponible</option>
                </select>                    

                <label>Categoria</label>
                <select name='categoria' onChange={(e) => handleChange(e)} required>
                    <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                    <option value="Plantines y Semillas">Plantines y Semillas</option>
                    <option value="Composteras">Composteras</option>
                    <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                    <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                </select>

                <button type='submit' onClick={()=> dispatch(postProduct(inputs))}>Crear</button>
            </form>

            <form>
                <h3>Imagen</h3>

                <label>Seleccione la imagen</label>
                <input type='file' name='imagen' onChange={(e)=>{
                    handleChangeImagen(e)
                }} required/>

                <button type='submit' onClick={() => dispatch(postImage(img))}>Crear</button>
            </form>

            <h3>Editar Productos</h3>
            <ol>
                {
                    productos.map((producto,i) => {
                        return(
                            
                            <li key={producto.id}>
                                
                                <img src={producto.imagen} alt="imagen producto"/>
                                <input type='file' name='imagen' onChange={(e) => handleChangeEditar(e)}/>

                                <input type='text' name='nombre' onChange={(e) => handleChangeEditar(e)} placeholder={producto.nombre}/>

                                <input type='number' name='precio' placeholder={producto.precio} onChange={(e) => handleChangeEditar(e)}/>

                                <input type='text' name='Descripcion' placeholder={producto.descripcion} onChange={(e) => handleChangeEditar(e)}/>

                                <select name='disponibilidad' onChange={(e) => handleChangeEditar(e)} >   
                                {
                                    //arriba al poner el value para mostrar el valor de categoria, deja de andar el put de esto
                                }
                                    <option value='true'>Disponible</option>     
                                    <option value='false'>No Disponible</option>
                                </select>

                                <select name='categoria'  onChange={(e) => handleChangeEditar(e)}>
                                {
                                    //arriba al poner el value para mostrar el valor de categoria, deja de andar el put
                                }
                                <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                                <option value="Plantines y Semillas">Plantines y Semillas</option>
                                <option value="Composteras">Composteras</option>
                                <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                                <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                                </select>

                                
                                <button id={producto.id} onClick={(e) => 
                                    // dispatch(putProduct(e.target.id, inputsEditar))
                                    editar(e)
                                }>Editar</button>

                                <button id={producto.id} onClick={(e) => {
                                    // dispatch(deleteProduct(e.target.id));
                                    borrar(e)
                                }}>Eliminar</button>
                            </li>)
                    })
                }   
            </ol>

            <h3>Editar Imagenes</h3>
            <ol>
                {
                    imagen.map(imagen => {
                        return(
                            <li key={imagen.id}>
                                <img src={imagen.imagen}/>

                                <input type='file' name='imagen' value={imagen.imagen}/>

                                <button id={imagen.id} onClick={(e) => {
                                    dispatch(deleteImage(e.target.id));
                                }}>Eliminar</button>
                            </li>)
                    })
                }
            </ol>
        </div>
    );
};

export default Admin;