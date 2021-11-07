import { postUser, IniciarSesion,facebookIni } from "../Redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Components/LogIn";
import SignIn from "../Components/SignIn";
import { useHistory } from "react-router-dom";
import InterfazDeUsuario from "../Components/InterfazDeUsuario";
import "../Styles/paginaDeLogin.css";

const LoginPage = () => {
  const Carritos=useSelector(state=>state.cartItems) //
  console.log(IdCarritos)
  const history = useHistory();
  const usuario = useSelector((state) => state.User);
  const dispatch = useDispatch();

  function InicioSesion(Usuario) {
    Usuario.ProductosCantidad=Carritos //se manda el objeto al back para  hacer un findOrCreate y añadirlos a la relacion con el usuario
    dispatch(IniciarSesion(Usuario, history));
  }

  const Registrarse = (Usuario) => {
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
