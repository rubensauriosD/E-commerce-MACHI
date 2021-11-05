 import { useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';  
 import axios from 'axios';
 import { getProductsAdmin } from '../../Redux/actions/action';         
            
            
            
export default function EditarProducto(){   
    
    
    const dispatch = useDispatch();
    
    var productos = useSelector(state => state.productsAdmin);
    
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
        alert(`El producto ${e.target.name} fue eliminado con exito`);
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
                alert(`El producto ${e.target.name} fue modificado con exito`)
                dispatch(getProductsAdmin())
            })
        }else{
            axios.put(`/productos/${e.target.id}`, inputsEditar);
            alert(`El producto ${e.target.name} fue modificado con exito`)
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
                                <input type='file' name='imagen' onChange={(e) => {setImagen(e.target.files[0])}}/>
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
                                    <input style={{height: "60px" }} type='text' name='descripcion' placeholder={producto.descripcion} onChange={(e) => handleChangeEditar(e)}/><br/>
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