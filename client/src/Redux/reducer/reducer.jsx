import {
    POST_PRODUCT,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    PUT_PRODUCT,
    GET_PRODUCT_ID,
    REMOVE_PRODUCT,
    POST_IMAGE,
    GET_IMAGES,
    DELETE_IMAGE,
    PUT_IMAGE,
    POST_USER,
    GET_USERS,
    DELETE_USER,
    PUT_USER,
    INICIARS,
    FILTRADOCATEGORIAS,
    GETPRODUCTBYNAME,
    ORDER_BY_NAME,
    ORDER_BY_PRECIO
} from "../actions/action.jsx"

const initialState={
    Products:[],
    productosPorCategorias:[],
    Product: {},
    Images: [],
    Image:{},
    Users: [],
    User:{},
    Comments:[],
    Comment:{},
    siInicio:false,
    //carrito?
    //paginacion?
}

const rootReducer=(state=initialState,{type, payload})=>{
    switch (type) {
        //Productos
        case POST_PRODUCT: return {
            ...state
        }
        case GET_PRODUCTS: return {
            ...state,
            Products: payload.products
        }
        case DELETE_PRODUCT: return {
            ...state
        }
        case PUT_PRODUCT: return {
            ...state,
            Product: payload
        }
        case GET_PRODUCT_ID: return {
            ...state,
            Product: payload
        }
        case REMOVE_PRODUCT: return {
            ...state,
            Product: payload
        }
        //imagenes
        case POST_IMAGE: return {
            ...state
        }
        case GET_IMAGES: return {
            ...state,
            Images: payload
        }
        case DELETE_IMAGE: return {
            ...state,

        }
        case PUT_IMAGE: return {
            ...state,
            Image: payload
        }

        //Usuarios
        case POST_USER: return {
            ...state
        }
        case GET_USERS: return {
            ...state,
            Users: payload
        }
        case DELETE_USER: return {
            ...state,
        }
        case PUT_USER: return {
            ...state,
            User: payload
        }
        case INICIARS:return{
            ...state,
            siInicio:payload.checked,
            User:payload.usuario
        }

        /* case GET_USER_ID: return {
            ...state,
            User: payload
        } */

        //Ordernado y filtros
        //Filtro por Categorias:
        case FILTRADOCATEGORIAS:{

            return{
            ...state,
            productosPorCategorias:state.Products.filter(producto=>producto.categoria===payload)
        }
        }

        //Filtro por nombre:
        case GETPRODUCTBYNAME: {
            return {
                ...state,
                Products: payload
            }
        }

        //By Name Order:
        case ORDER_BY_NAME: {
            const orderName = payload === 'Asc' ?
            state.Products.sort(function(a, b) {
                if(a.nombre > b.nombre) {
                    return 1;
                }
                if(b.nombre > a.nombre) {
                    return -1;
                }
                return 0;
            }) :
            state.Products.sort(function(a, b) {
                if(a.nombre > b.nombre) {
                    return -1;
                }
                if(b.nombre > a.nombre) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                Products: orderName
            }
        }

        //By Precio:
        case ORDER_BY_PRECIO: {
            const orderPrecio = payload === 'Desc' ?
            state.Products.sort(function(a, b) {
                if(a.precio > b.precio) {
                    return 1;
                }
                if(b.precio > a.precio) {
                    return -1;
                }
                return 0;
            }) :
            state.Products.sort(function(a, b) {
                if(a.precio > b.precio) {
                    return -1;
                }
                if(b.precio > a.precio) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                Products: orderPrecio
            }
        }

        default: return state
    }
}
export default rootReducer