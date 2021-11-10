import {productoConstante} from "../constants/tipadosDespacho";
const productState = {
    products: [],
    productsAdmin: [],
    productosPorCategorias: [],
    Product: {},
    nombre: "",
    ordenA: "",
    ordenP: "",
    filtroC: "",
    commets: [],
    pagina: 1,
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
    case productoConstante.SET_ORDEN_A:
      return {
        ...state,
        ordenA: payload,
      };
    case productoConstante.SET_ORDEN_P:
      return {
        ...state,
        ordenP: payload,
      };
    case productoConstante.SET_FILTRO_C:
      return {
        ...state,
        filtroC: payload,
      };
    case productoConstante.GET_COMENTARIOS: {
      return {
        ...state,
        commets: payload
      }
    }
    default:
      return state;
    }
}