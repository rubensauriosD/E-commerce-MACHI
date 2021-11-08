import { Button,Box,TextField } from "@mui/material";
import React, { useState } from "react";
import './MercadoPagoStyle.css';
import {useDispatch} from "react-redux";
import { checkout } from "../../Redux/actions/action";

function validate(input){
    let error = {};
    if(!input.nombre){
        error.nombre = ' * Campo Requerido';
    }
    if(!input.apellido){
        error.apellido = ' * Campo Requerido';
    }
    if(!input.codigo){
        error.codigo = ' * Campo Requerido';
    }
    if(!input.telefono ){
        error.telefono = ' * Campo Requerido';
    }
    if(!input.codigoPostal){
        error.codigoPostalo = ' * Campo Requerido';
    }
    if(!input.calle){
        error.calle = ' * Campo Requerido';
    }
    if(!input.altura){
        error.altura = ' * Campo Requerido';
    }
    if(!input.email || !input.email.includes('@')|| !input.email.includes('.') || input.email.length < 6 || input.email.split('@') < 2 ){
        error.email = ' email no valido';
    }
    return error;
}

export default function MercadoPago(){
    const dispatch=useDispatch()
/* const [ input, setInput] = useState({ nombre:"", precio:"", cantidad:"",  })

function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })

} */ 

const [ payer, setPayer] = useState({ nombre:"", apellido:"", codigo:"", telefono:"", codigoPostal:"", calle:"", altura:"",  } )

const [error, setError] = useState({})

function handleChange(e) {
    setPayer({
        ...payer,
        [e.target.name]: e.target.value

    })

    setError(validate({
        ...payer,
        [e.target.name]: e.target.value
    }))
}
/*payer: {
          phone: { area_code: '', number: '' },
          address: { zip_code: '', street_name: '', street_number: null },
          email: '',
          identification: { number: '', type: '' },
          name: '',
          surname: '',
          date_created: null,
          last_purchase: null
        },

        */

        const handleOnSubmit=(e )=>{
            e.preventDefault()
            dispatch(checkout(payer))
        } 

    return (
        <div>
            <form  onSubmit={handleOnSubmit} >

                <Box>
                    <TextField error={error.nombre}  className="input-buyer" onChange={handleChange} value={payer.nombre} name="nombre" type="text" label="Nombre" variant="filled" color="success"/><br/><br/>
                    <TextField error={error.apellido}  className="input-buyer" onChange={handleChange} value={payer.apellido} name="apellido" type="text" label="Apellido" variant="filled" color="success"/><br/><br/>

                    <TextField error={error.codigo}  className="input-buyer-short" onChange={handleChange} value={payer.codigo} name="codigo" type="number" label="Codigo Area (sin 0)" variant="filled" color="success"/>
                    <TextField error={error.telefono}  className="input-buyer-phone" onChange={handleChange} value={payer.telefono} name="telefono" type="number" label="Telefono (sin 15)" variant="filled" color="success"/><br/><br/>

                    <TextField error={error.codigoPostal}  className="input-buyer-short" onChange={handleChange} value={payer.codigoPostal} name="codigoPostal" type="text" label="Codigo Postal" variant="filled" color="success"/>
                    <TextField error={error.calle}  className="input-buyer-adress" onChange={handleChange} value={payer.calle} name="calle" type="text" label="Calle" variant="filled" color="success"/>
                    <TextField error={error.altura}  className="input-buyer-short" onChange={handleChange} value={payer.altura} name="altura" type="integer" label="Altura" variant="filled" color="success"/><br/><br/>

                    <TextField  error={error.email} helperText={error.email} className="input-buyer" onChange={handleChange} value={payer.email} name="email" type="text" label="Email" variant="filled" color="success"/><br/><br/>
                   
                    <Button  sx={{justifySelf:"center"}} variant="contained" color="success" type="submit">Finalizar Compra</Button>
                    
                </Box>
                {/* <div>
                    <form action="http://localhost:3001/checkout" method="POST" >
                        <Box>
                            <TextField onChange={(e)=>handleChange(e)} name="nombre" type="text" label="Nombre" variant="filled" color="success"/><br/><br/>
                            <TextField onChange={handleChange} name="precio" type="number" label="Precio" variant="filled" color="success"/><br/><br/>
                            <TextField onChange={handleChange} name="cantidad" type="number" label="Cantidad" variant="filled" color="success"/><br/><br/>
                            <Button type="submit">Comprar</Button>
                        </Box>     
                    </form>
                </div>*/}

            </form>
        </div>
    )


}