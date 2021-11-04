 import { useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';  
 import axios from 'axios';
 import { getProductsAdmin } from '../../Redux/actions/action';         
            
            
            
export default function EditarProducto(){   
    
    
    const dispatch = useDispatch();
    
    var productos = useSelector(state => state.productsAdmin);
    
    const [inputsEditar, setInputsEditar] = useState({
        nombre: '',
        precio:'',
        descripcion: '',
        categoria: '',
        imagen:'',
        disponibilidad:''  
    })
    
       
    function handleChangeEditar(e) {
        setInputsEditar({
            ...inputsEditar,
            [e.target.name]: e.target.value
        })
    } 

    function borrar(e) { 
        axios.delete(`/productos/${e.target.id}`);
        alert(`El producto ${e.target.name} fue eliminado con exito`);
        dispatch(getProductsAdmin())
    }

    function editar(e) { 
        axios.put(`/productos/${e.target.id}`, inputsEditar);
        alert(`El producto ${e.target.name} fue modificado con exito`)
        
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
                                            if(inputsEditar.nombre) return inputsEditar.nombre; else  inputsEditar.nombre = producto.nombre;
                                            if(inputsEditar.precio) return inputsEditar.precio; else inputsEditar.precio = producto.precio;
                                            if(inputsEditar.imagen) return inputsEditar.imagen; else  inputsEditar.imagen = producto.imagen;
                                            if(inputsEditar.precio) return inputsEditar.precio; else  inputsEditar.precio = producto.precio;
                                            if(inputsEditar.disponibilidad) return inputsEditar.disponibilidad; else  inputsEditar.disponibilidad = producto.disponibilidad;
                                            if(inputsEditar.categoria) return inputsEditar.categoria; else inputsEditar.categoria = producto.categoria;
                                            if(inputsEditar.descripcion) return inputsEditar.descripcion; else inputsEditar.descripcion = producto.descripcion;
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
        </div>
    )

}