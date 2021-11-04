import { Button,Box,TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';


export default function MercadoPago(){

const [ input, setInput] = useState({ nombre:"", precio:"", cantidad:"",  })

function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })

}

function crear(){
    axios.post('/checkout', input)
   
}

    return (
        <div>
            <form onSubmit={crear} >
                <Box>
                    <TextField onChange={(e)=>handleChange(e)} name="nombre" type="text" label="Nombre" variant="filled" color="success"/><br/><br/>
                    <TextField onChange={handleChange} name="precio" type="number" label="Precio" variant="filled" color="success"/><br/><br/>
                    <TextField onChange={handleChange} name="cantidad" type="number" label="Cantidad" variant="filled" color="success"/><br/><br/>
                <Button type="submit">Comprar</Button>
                </Box>     
            </form>
        </div>
    )


}