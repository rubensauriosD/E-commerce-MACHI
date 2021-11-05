import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postImage } from '../../Redux/actions/action';
import axios from 'axios';


export default function CargarImagen(){   
    
    const dispatch = useDispatch();

    const [img, setImg] = useState('')

    const subirImagen = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("file", img)
        formData.append("upload_preset", "tpvdkdav")
    
        axios.post("https://api.cloudinary.com/v1_1/mau-ar/image/upload", formData)
        .then((response) => {
            return dispatch(postImage(response.data))
        })
        .then(() => {
            alert('La imagen fue recibida exitosamente')
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <form>
            <h3>Imagen Galeria</h3>

            <label>Seleccione la imagen: </label>
            <input type='file' name='imagen' onChange={(e)=>{
                setImg(e.target.files[0])
            }} required/>

            <br/><button className="buttonAdmin" type='submit' onClick={subirImagen}>Crear</button>
        </form> 
    )
}    