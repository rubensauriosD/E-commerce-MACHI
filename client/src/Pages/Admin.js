import React from "react";
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {getProductsAdmin, deleteProduct, putProduct, getImages, deleteImage, postImage, postProduct} from '../Redux/actions/action';
import axios from 'axios'
import '../Styles/AdminStyle.css'



const Admin = () => {

    var productos = useSelector(state => state.productsAdmin);
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
        dispatch(getProductsAdmin());
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
        axios.delete(`http://localhost:3001/productos/${e.target.id}`);
        alert(`El producto ${e.target.name} fue eliminado con exito`);
        dispatch(getProductsAdmin())
    }

    function editar(e) { 
        axios.put(`http://localhost:3001/productos/${e.target.id}`, inputsEditar);
        alert(`El producto ${e.target.name} fue modificado con exito`)
        
    }

    return (
        <div className="adminContenedor">
            <h1>Admin</h1>
            <div className='formsAdminExterno'>
        
            <div className='formsAdmin'>
            <form >
                <h3>Cargar Producto </h3>
                <div class="levelAdmin">
                    <label>Nombre: </label>
                    <input type='text' name='nombre' onChange={(e) => handleChange(e)} required/>
                </div>
                
                <div class="levelAdmin">
                    <label>Precio: </label>
                    <input type='number' name='precio' onChange={(e) => handleChange(e)} required/>
                </div>

                <div class="levelAdmin">   
                    <label>Descripcion: </label>
                    <input type='text' name='descripcion' onChange={(e) => handleChange(e)} />
                </div >

                <div class="levelAdmin">
                    <label>Disponibilidad: </label>
                    <select name='disponibilidad' onChange={(e) => handleChange(e)} required>
                    <option value='true'>Disponible</option>     
                    <option value='false'>No Disponible</option>
                    </select> 
                </div>                   

                <div class="levelAdmin">
                    <label>Categoria: </label>
                    <select name='categoria' onChange={(e) => handleChange(e)} required>
                        <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                        <option value="Plantines y Semillas">Plantines y Semillas</option>
                        <option value="Composteras">Composteras</option>
                        <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                        <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                    </select>
                </div>

                <div class="levelAdmin">
                    <label>Seleccione la imagen: </label>
                    <input type='file' name='imagen' onChange={(e) => handleChange(e)}/>
                </div>

                <button className="buttonAdmin" type='submit' onClick={()=> dispatch(postProduct(inputs))}>Crear</button>
            </form>
            </div>
            <hr/> 
            <form>
                <h3>Imagen Galeria</h3>

                <label>Seleccione la imagen: </label>
                <input type='file' name='imagen' onChange={(e)=>{
                    handleChangeImagen(e)
                }} required/>

                <br/><button className="buttonAdmin" type='submit' onClick={() => dispatch(postImage(img))}>Crear</button>
            </form>
            
            <hr/>

            <h3>Editar Productos</h3>
            <ol>
                {
                     productos.productos?.map((producto, i) => {
                        return(
                            
                        <li key={producto.id}>
                        <div className="ordererAdmin">        
                            <div className="imagenAdminDiv">    
                                <img className="imagenAdmin" src={producto.imagen} alt="imagen producto"/>
                                <input type='file' name='imagen' onChange={(e) => handleChangeEditar(e)}/>
                            </div>    
                            <div className="datosProductoAdmin">
                                <div className="labelAdminEdit">
                                    <label>Nombre: </label>
                                    <input type='text' name='nombre' onChange={(e) => handleChangeEditar(e)} placeholder={producto.nombre}/><br/>
                                </div>

                                <div className="labelAdminEdit">
                                    <label>Precio: </label>
                                    <input type='number' name='precio' placeholder={producto.precio} onChange={(e) => handleChangeEditar(e)}/><br/>
                                </div>

                                <div className="labelAdminEdit">
                                    <label>Descripcion: </label>
                                    <input style={{height: "60px" }} type='text' name='Descripcion' placeholder={producto.descripcion} onChange={(e) => handleChangeEditar(e)}/><br/>
                                </div>

                                <div className="labelAdminEdit">
                                    <label>Disponibilidad Actual: {producto.disponibilidad? 'Disponible' : 'No disponible'}</label><br/>
                                    <select name='disponibilidad' onChange={(e) => handleChangeEditar(e)} >   
                                        <option value='true'>Disponible</option>     
                                        <option value='false'>No Disponible</option>
                                    </select><br/>
                                </div>

                                <div className="labelAdminEdit">
                                    <label>Categoria Actual: {producto.categoria}</label><br/>
                                    <select name='categoria'  onChange={(e) => handleChangeEditar(e)}>
                                    <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                                    <option value="Plantines y Semillas">Plantines y Semillas</option>
                                    <option value="Composteras">Composteras</option>
                                    <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                                    <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                                    </select><br/>
                                </div>

                                <div className="labelAdminEdit">
                                    <button className="buttonAdmin" id={producto.id} name={producto.nombre} onClick={(e) => {
                                            inputsEditar.nombre ? inputsEditar.nombre = inputsEditar.nombre :  inputsEditar.nombre = producto.nombre;
                                            inputsEditar.precio ? inputsEditar.precio = inputsEditar.precio :  inputsEditar.precio = producto.precio;
                                            inputsEditar.imagen ? inputsEditar.imagen = inputsEditar.imagen :  inputsEditar.imagen = producto.imagen;
                                            inputsEditar.precio ? inputsEditar.precio = inputsEditar.precio :  inputsEditar.precio = producto.precio;
                                            inputsEditar.disponibilidad ? inputsEditar.disponibilidad = inputsEditar.disponibilidad :  inputsEditar.disponibilidad = producto.disponibilidad;
                                            inputsEditar.categoria ? inputsEditar.categoria = inputsEditar.categoria :  inputsEditar.categoria = producto.categoria;
                                            inputsEditar.descripcion ? inputsEditar.descripcion = inputsEditar.descripcion :  inputsEditar.descripcion = producto.descripcion;
                                            editar(e)
                                        }
                                    }>Editar</button>

                                    <button className="buttonAdmin" id={producto.id} onClick={(e) => {
                                        // dispatch(deleteProduct(e.target.id));
                                        borrar(e)
                                    }}>Eliminar</button>
                                </div>
                            </div>  
                        </div>          
                        </li>)
                    }) 
                }   
            </ol>
            <hr/>    
            <h3>Editar Imagenes</h3>
            <ol>
                {
                   /*  imagen.map(imagen => {
                        return(
                            <li key={imagen.id}>
                                <img src={imagen.imagen}/>
                                <input type='file' name='imagen' value={imagen.imagen}/>
                                <button id={imagen.id} onClick={(e) => {
                                    dispatch(deleteImage(e.target.id));
                                }}>Eliminar</button>
                            </li>)
                    }) */
                }
            </ol>
            </div>
        </div>
    );
};

export default Admin;