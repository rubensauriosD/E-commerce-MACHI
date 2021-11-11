import {
  postUser,
  IniciarSesion,
  facebookIni,
} from "../Redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Components/LogIn";
import SignIn from "../Components/SignIn";
import { useHistory } from "react-router-dom";
import InterfazDeUsuario from "../Components/InterfazDeUsuario";
import "../Styles/paginaDeLogin.css";
import { removeAllCartItems } from "../Redux/actions/cartAction";

const LoginPage = () => {
  const history = useHistory();
  const carrito = useSelector((state) => state.cart.cartItems);
  const usuario = useSelector((state) => state.usuario.User);
  const dispatch = useDispatch();

  function InicioSesion(Usuario) {
    Usuario.carritos = carrito;
    dispatch(IniciarSesion(Usuario, history));
    dispatch(removeAllCartItems());
  }

  const Registrarse = (Usuario) => {
    Usuario.tipo = "user";
    dispatch(postUser(Usuario));
  };
  const RegistroEInicioConFacebook = () => {
    dispatch(facebookIni(history));
  };
  console.log("el usuario: ", usuario);
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
        <SignIn SubmitS={Registrarse} submitFace={RegistroEInicioConFacebook} />
      </div>
    );
  }
};

export default LoginPage;
