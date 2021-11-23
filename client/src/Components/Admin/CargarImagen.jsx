import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postImage } from '../../Redux/actions/imageAction';
import { Button, TextField } from "@mui/material";
import swal from 'sweetalert';
import axios from 'axios';

export default function CargarImagen(){   
    
    const dispatch = useDispatch();

    const [img, setImg] = useState('')

    const subirImagen = (e) => {
        e.preventDefault();
        const formData = new FormData() 
        formData.append("file", img)
        formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`)
    
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData)
        .then((response) => {
            dispatch(postImage(response.data) )
        })
        .then(() => {
            swal('La imagen fue recibida exitosamente')
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <div className="subirImagenesGaleria">
            <form>
                <h3>Imagen Galeria</h3>

            {/*  <label>Seleccione la imagen: </label>
                <input type='file' name='imagen' onChange={(e)=>{
                    setImg(e.target.files[0])
                }} required/>

                <br/><button className="buttonAdmin" type='submit' onClick={subirImagen}>Crear</button> */}
                
                <TextField className="levelAdminMaterial" name="imagen" type="file" variant="filled" color="success" onChange={(e)=>{setImg(e.target.files[0])}} required/><br/><br/>
                <Button sx={{justifySelf:"center", margin: '25px'}} variant="contained" color="success" type="submit" onClick={subirImagen}>Crear</Button>     
            
            </form>
        </div> 
    )
}    