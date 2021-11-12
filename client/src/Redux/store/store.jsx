import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import rootReducer from "../reducer/reducer.jsx";

//Reducers
import {cartReducer} from "../reducer/cartreducer";
import {imageReducer} from "../reducer/imageReducer";
import {productReducer} from "../reducer/productReducer";
import {userReducer} from "../reducer/userReducer";
import {facturaReducer} from "../reducer/facturaReducer";

const reducer = combineReducers({
  cart: cartReducer,
  productos: productReducer,
  imagen: imageReducer,
  usuario: userReducer,
  factura: facturaReducer
})

// const cartItemsInLocalStorage = localStorage.getItem("cart")
// ? JSON.parse(localStorage.getItem("cart"))
// : [];

// const initial_State = {
//   cart: {
//     cartItems: cartItemsInLocalStorage
//   }
// };

const store = createStore(
  reducer,
  // initial_State,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
