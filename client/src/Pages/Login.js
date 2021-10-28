import React from "react";
import {postUser,getUsers} from "../Redux/actions/action"
import  {useDispatch} from "react-redux"
import Login from "../Components/LogIn";
import SignIn from "../Components/SignIn";
const LoginPage = () => {
  const dispatch=useDispatch()
  const IniciarSesion=(Usuario)=>{
    dispatch(getUsers(Usuario))
  }
  const Registrarse=(Usuario)=>{
    dispatch(postUser(Usuario))
  }
  return (
    <div>
      <Login SubmitL={IniciarSesion}/>
      <SignIn SubmitS={Registrarse}/>
    </div>
  );
};

export default LoginPage;
