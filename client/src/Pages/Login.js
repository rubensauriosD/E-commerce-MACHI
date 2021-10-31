import React from "react";
import {postUser,IniciarSesion} from "../Redux/actions/action"
import  {useDispatch,useSelector} from "react-redux"
import Login from "../Components/LogIn";
import SignIn from "../Components/SignIn";
import InterfazDeUsuario from "../Components/InterfazDeUsuario";
import "../Styles/paginaDeLogin.css"
const LoginPage = () => {
  const usuario=useSelector(state=>state.User)
  const dispatch=useDispatch()
  const InicioSesion=(Usuario)=>{
    dispatch(IniciarSesion(Usuario))
  }
  const Registrarse=(Usuario)=>{
    dispatch(postUser(Usuario))
  }
  console.log("Aca el usuario que Inicio Sesion", usuario)
  if(usuario&&Object.values(usuario).length!==0){     
    return (<div className="InterfazDeUsuario"> <InterfazDeUsuario datosUsuario={usuario}/></div>)
  }else{
    return (
      <div className="InterfazDeFormulario">
        <Login SubmitL={InicioSesion}/>
        <SignIn SubmitS={Registrarse}/>
      </div>
    );
  }
};

export default LoginPage;
