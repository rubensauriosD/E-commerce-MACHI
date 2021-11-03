import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postImage } from '../../Redux/actions/action';



export default function CargarImagen(){   
    
    const dispatch = useDispatch();

    const [img, setImg] = useState('')

    function handleChangeImagen(e) {
        setImg(e.target.value)
    } 
    
    return (
        <form>
            <h3>Imagen Galeria</h3>

            <label>Seleccione la imagen: </label>
            <input type='file' name='imagen' onChange={(e)=>{
                handleChangeImagen(e)
            }} required/>

            <br/><button className="buttonAdmin" type='submit' onClick={() => dispatch(postImage(img))}>Crear</button>
        </form> 
    )
}    