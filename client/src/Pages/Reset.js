import React,{useState} from 'react'
import {useDispatch} from "react-redux";
import { resetearContraseña } from '../Redux/actions/userAction';
import { Button, TextField} from "@mui/material";
import swal from 'sweetalert';

const Reset  = ()=>{
    //const history = useHistory()
    const dispatch = useDispatch()
    const [email,setEmail] = useState("")


    const onReset = (e)=>{
        e.preventDefault()
        dispatch (resetearContraseña(email))
        swal('Revisa tu email. Si el mail no llega, intente de nuevo!')
    }


   
    return (
      <div className="divReset">
          <div className="">
            <h3>Ingrese su email</h3>
            <TextField type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
            <br/>
            <br/>
            <Button onClick={onReset} variant="contained" color="success">Resetear Contraseña</Button>
            
            
    
        </div>
      </div>
    )
}


export default Reset