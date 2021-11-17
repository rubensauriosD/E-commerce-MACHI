import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from "react-redux";
import { resetearContraseña } from '../Redux/actions/userAction';

const Reset  = ()=>{
    const history = useHistory()
    const dispatch = useDispatch()
    const [email,setEmail] = useState("")


    const onReset = (e)=>{
        e.preventDefault()
        dispatch (resetearContraseña(email))
        history.push('/login')
    }


   
    return (
      <div className="divReset">
          <div className="">
            <h2>Ingrese el mail de usuario</h2>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btnReset"onClick={onReset} >Resetear Contraseña</button>
            
    
        </div>
      </div>
    )
}


export default Reset