import { postUser, IniciarSesion,facebookIni } from "../Redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Components/LogIn";
import SignIn from "../Components/SignIn";
import { useHistory } from "react-router-dom";
import InterfazDeUsuario from "../Components/InterfazDeUsuario";
import "../Styles/paginaDeLogin.css";

const LoginPage = () => {
  const history = useHistory();
  const usuario = useSelector((state) => state.User);
  const dispatch = useDispatch();

  function InicioSesion(Usuario) {
    dispatch(IniciarSesion(Usuario, history));
  }

  const Registrarse = (Usuario) => {
    Usuario.tipo="user"
    dispatch(postUser(Usuario));
  };
  const RegistroEInicioConFacebook=()=>{
    dispatch(facebookIni(history))
  }
  if (usuario && Object.values(usuario).length !== 0) {
    return (
      <div className="InterfazDeUsuario">
        {" "}
        <InterfazDeUsuario datosUsuario={usuario} />
      </div>
    );
  } else {
    return (
      <div className="InterfazDeFormulario">
        <Login SubmitL={InicioSesion} />
        <SignIn SubmitS={Registrarse} submitFace={RegistroEInicioConFacebook}/>
      </div>
    );
  }
};

export default LoginPage;
