import {cartConstantes} from "../constants/tipadosDespacho";

const CART_INITIAL_STATE = {
  cartItems: localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart"))
: []
};
export const cartReducer = (state = CART_INITIAL_STATE, {type, payload}) =>{
    switch (type) {
        case cartConstantes.ADD_TO_CART_GUEST:
          let item = payload;
          console.log(item)
            
            const existItem = state.cartItems.find((x) => x.id === item.id)
            if (existItem) {
              item = { ...item, qty: ++existItem.qty };
                return {
                  ...state,
                  cartItems: state.cartItems.map((x) =>
                    x.product === existItem.id ? item : x
                  ),
                };
              } else {
                item = { ...item, qty: 1 };
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
            cartItems: state.cartItems.filter((x) => x.id !== payload)
        };
        case cartConstantes.CHANGE_QTY:
          const { id, action } = payload;
          let itemSelected = state.cartItems.find((x) => x.id === id);
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
            default:
                return state;
        }
}