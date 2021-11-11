import { cartConstantes } from "../constants/tipadosDespacho";

const CART_INITIAL_STATE = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  itemsCarritoDb: [],
};
export const cartReducer = (state = CART_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case cartConstantes.ADD_TO_CART_GUEST:
      let item = payload;
      console.log(item);
      const existItem = state.cartItems.find(
        (x) => x.idProducto === item.idProducto
      );
      if (existItem) {
        item = { ...item, qty: ++existItem.qty };
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.idCarrito === existItem.idCarrito ? item : x
          ),
        };
      } else {
        item = { ...item, qty: 2 };
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    /*  let item = payload.product;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        item = { ...item, qty: ++existItem.qty };
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          ),
        };
      } else {
        item = { ...item, qty: 1 };
        console.log(item.qty);
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      } */
    case cartConstantes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.idCarrito !== payload),
      };
    case cartConstantes.CHANGE_QTY:
      const { id, action } = payload;
      let itemSelected = state.cartItems.find((x) => x.idCarrito === id);
      if (action === "increment") {
        itemSelected.qty++;
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else {
        itemSelected.qty > 1 && itemSelected.qty--;
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }
    case cartConstantes.OBTENCIONDELADB: {
      console.log("si paso por aca con: ", payload);
      state.itemsCarritoDb.length = 0;
      return {
        ...state,
        itemsCarritoDb: state.itemsCarritoDb.concat(payload),
      };
    }
    case cartConstantes.REMOVIDODELADB: {
      state.itemsCarritoDb.length = 0;
      return {
        ...state,
        itemsCarritoDb: state.itemsCarritoDb.concat(payload),
      };
    }
    case cartConstantes.CAMBIOCANTIDAD: {
      state.itemsCarritoDb.length = 0;
      return {
        ...state,
        itemsCarritoDb: state.itemsCarritoDb.concat(payload),
      };
    }
    case cartConstantes.ANIADIRALCARRO: {
      state.itemsCarritoDb.length = 0;
      return {
        ...state,
        itemsCarritoDb: state.itemsCarritoDb.concat(payload),
      };
    }
    case cartConstantes.REMOVERDELCARROCERRARSESION: {
      console.log("llego al reducer");
      return {
        ...state,
        itemsCarritoDb: [],
        cartItems: [],
      };
    }
    default:
      return state;
  }
};
