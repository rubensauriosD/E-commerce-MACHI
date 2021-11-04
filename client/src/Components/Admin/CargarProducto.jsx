import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../Redux/actions/action'


export default function CargarProducto(){

    const dispatch= useDispatch();

    const [inputs, setInputs] = useState({
        nombre: '',
        precio:'',
        descripcion: '',
        categoria: '',
        imagen:'',
        disponibilidad:false  
    })
    
  
    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    } 


    return ( 
        <div className="productoAdmin">
                
                <div className="formsAdmin" >
                <div className="formNombre" ><h2>Cargar Producto </h2></div>
                    <form >
                        <div className="levelAdmin">
                            <label>Nombre </label>
                            <input type='text' name='nombre' onChange={(e) => handleChange(e)} required/>
                        </div>
                                
                        <div className="levelAdmin">
                            <label>Precio </label>
                            <input type='number' name='precio' onChange={(e) => handleChange(e)} required/>
                        </div>

                        <div className="levelAdmin" >   
                            <label>Descripcion </label>
                            <input style={{height: "60px" }} type='text' name='descripcion' onChange={(e) => handleChange(e)} />
                        </div >

                        <div className="levelAdmin">
                            <label>Disponibilidad </label>
                            <select name='disponibilidad' onChange={(e) => handleChange(e)} required>
                            <option value='true'>Disponible</option>     
                            <option value='false'>No Disponible</option>
                            </select> 
                        </div>                   

                        <div className="levelAdmin">
                            <label>Categoria </label>
                            <select name='categoria' onChange={(e) => handleChange(e)} required>
                                <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                                <option value="Plantines y Semillas">Plantines y Semillas</option>
                                <option value="Composteras">Composteras</option>
                                <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                                <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                            </select>
                        </div>

                        <div className="levelAdmin">
                            <label>Seleccione la imagen </label>
                            <input type='file' name='imagen' onChange={(e) => handleChange(e)}/>
                        </div>
                    </form> 
                    
                </div>            
                <button className="buttonAdmin" type='submit' onClick={()=> dispatch(postProduct(inputs))}>Crear</button>
        </div>
    )

        
                    
}            