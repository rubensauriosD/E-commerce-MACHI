import {constanteUsuarios} from '../constants/tipadosDespacho';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();
//postear usuario
export const postUser = (user,swal) => {
    return (dispatch) => { 
      axios
        .post(`/usuarios`, user,{withCredentials:true})
        .then((response) => {
          swal("Felicidades, te haz registrado a Machi")
          return dispatch({
            type: constanteUsuarios.POST_USER,
            payload: response,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  // obtener todos los usuarios
  export const getUsers = () => {
    return (dispatch) => {
      axios
        .get(`/usuarios`,{withCredentials:true})
        .then((users) => {
          return dispatch({
            type: constanteUsuarios.GET_USERS,
            payload: users.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  //Iniciar Sesion
  export const IniciarSesion = (usuario, history) => {
    return (dispatch) => {
      axios.post("/usuarios/inicioSesion", usuario,{withCredentials:true}).then((resultadoDeUsuario) => {
        dispatch({ type: constanteUsuarios.INICIARS, payload: resultadoDeUsuario.data });
        if (resultadoDeUsuario.data.tipo === "admin") history.push("/Admin");
        else if (resultadoDeUsuario.data.tipo === "user") history.push("/cart");
      }).catch(e=>console.log(e));
    };
  };
  export const cerrarSesion = () => {
    return (dispatch) => {
      axios
        .get("/usuarios/cerrarSesion",{withCredentials:true})
        .then((resultado) => dispatch({ type: constanteUsuarios.CERRARSESION }));
    };
  };
  //COMPLETAR
  //borrar usuario
  export const deleteUser = ({ id }) => {
    return (dispatch) => {
      axios
        .delete(`/usuarios/${id}`,{withCredentials:true})
        .then((res) => {
          return dispatch({
            type: constanteUsuarios.DELETE_USER,
            payload: id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  //REVISAR
  //modificar un usuario
  export const putUser = ({ id }) => {
    return (dispatch) => {
      axios
        .put(`/usuarios/${id}`,{withCredentials:true})
        .then((userUpdate) => {
          return dispatch({
            type: constanteUsuarios.PUT_USER,
            payload: userUpdate.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  export const facebookIni = (carritos,history) => {
  return (dispatch) => {
    let timer = null; 
    const facebookLoginURL = process.env.ROUTE_BACK_FACEBOOK || "http://localhost:3001/usuarios/auth/facebook";
    console.log(facebookLoginURL)
    const newWindow = window.open(
      facebookLoginURL,
      "_blank",
      "width=500,height=600"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          axios
            .post("/usuarios/inicioSesionFacebook",{carritos}, { withCredentials: true })
            .then((usuario) => {
              dispatch({ type: constanteUsuarios.INICIOFACEBOOK, payload: usuario.data });
              history.push("/cart");
            })
            .catch((error) => console.log(error));
          if (timer) clearInterval(timer);
        }
      });
    }
  };
};
export const comprobanteSiEsAdmin=(history)=>{
  return(dispatch)=>{
    axios.get("usuarios/test",{withCredentials:true})
    .then(resu=>console.log("si es admin"))
    .catch(e=>history.push("/login"))
  }
}

export const comprobanteSiEsUsuario=(history)=>{
  return(dispatch)=>{
    axios.get("usuarios/testUsuario",{withCredentials:true})
    .catch(()=>history.push("/login"))
  }
}

export const resetearContraseña= (email) => {
  
  return (dispatch) => { axios
    .post("/mailer/reset", {email})
    .then((result) => { console.log("Mail enviado desde el front")})
    .catch((e) => console.log(e));
  };
};
  


export const nuevaContraseña= (nuevaContrasenia, email) => {
  return (dispatch) => {
    axios.put(`usuarios`,{nuevaContrasenia, email})
    .then((updateContrasenia)=>{
      return dispatch({
        type: constanteUsuarios.NUEVA_CONTRASENIA,
        payload: updateContrasenia.data
      })
    })
  }
}

export const pedirUsuarioPorToken = (token) => {
  return (dispatch) => {
    axios.get(`mailer/reset/${token}`)
    .then((usuario) => {
      return dispatch({
        type: constanteUsuarios.GET_USUARIO_POR_TOKEN,
        payload: usuario.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
