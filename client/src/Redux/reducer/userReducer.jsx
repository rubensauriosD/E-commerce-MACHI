import {constanteUsuarios} from "../constants/tipadosDespacho";
const userState = {
    Users: [],
    User: {}
}

export const userReducer = (state = userState, {type, payload}) => {
    switch (type) {
        case constanteUsuarios.POST_USER:
            return {
              ...state,
            };
        case constanteUsuarios.GET_USERS:
        return {
            ...state,
            Users: payload,
        };
        case constanteUsuarios.DELETE_USER:
        return {
            ...state,
        };
        case constanteUsuarios.PUT_USER:
        return {
            ...state,
            User: payload,
        };
        case constanteUsuarios.INICIARS: {
        console.log(payload);
        return {
            ...state,
            User: payload,
        };
        }
        case constanteUsuarios.CERRARSESION: {
            return {
              ...state,
              User: {},
            };
          }
        case constanteUsuarios.INICIOFACEBOOK: {
        return {
            ...state,
            User: payload,
        };
        }
        
        case constanteUsuarios.NUEVA_CONTRASENIA: {
            return {
                ...state,
                User: payload
            }
        }
        default:
            return state;
    }
}