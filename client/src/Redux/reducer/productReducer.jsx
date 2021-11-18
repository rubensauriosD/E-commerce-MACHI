import {productoConstante} from "../constants/tipadosDespacho";
const productState = {
    products: [],
    productsAdmin: [],
    productosPorCategorias: [],
    Product: {},
    nombre: "",
    comments: [],
    pagina: 1,
    categoria:"",
    ordenamiento:"",
    addComments: [],
    
}

export const productReducer = (state = productState, {type, payload}) => {
    switch (type) {
        //Productos
    case productoConstante.POST_PRODUCT:
        return {
          ...state,
        };
    case productoConstante.GET_PRODUCTS:
    return {
        ...state,
        products: payload,
    };
    case productoConstante.GET_PRODUCTS_ADMIN:
    return {
        ...state,
        productsAdmin: payload,
    };
    case productoConstante.DELETE_PRODUCT:
    return {
        ...state,
    };
    case productoConstante.PUT_PRODUCT:
    return {
        ...state,
        Product: payload,
    };
    case productoConstante.GET_PRODUCT_ID:
    return {
        ...state,
        Product: payload,
    };
    case productoConstante.REMOVE_PRODUCT:
    return {
        ...state,
        Product: payload,
    };
    case productoConstante.FILTRADOCATEGORIAS: {
    return {
        ...state,
        productosPorCategorias: state.Products.filter(
        (producto) => producto.categoria === payload
        ),
    };
    }
    case productoConstante.SET_NOMBRE:
      return {
        ...state,
        nombre: payload,
      };
    case productoConstante.SET_PAGINA:
      return {
        ...state,
        pagina: payload,
      };
    case productoConstante.GET_COMENTARIOS: {
      return {
        ...state,
        comments: payload
      }
    }
    case productoConstante.ADD_COMENTARIOS: {
      return {
        ...state,
        addComments: payload
      }
    };
    case productoConstante.RESET: {
      return {
        ...state,
        ordenamiento: payload
      }
    }
    case "CAMBIO_DE_CATEGORIA":{
      return{
        ...state,
        categoria:payload
      }
    }
    case "CAMBIO_ORDENAMIENTO":{
      return{
        ...state,
        ordenamiento: payload
      }
    }
    default:
      return state;
    }
}