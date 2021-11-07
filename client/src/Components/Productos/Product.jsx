import { Link } from "react-router-dom";
import "./ProductStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCartGuest,aniadirCarrito } from "../../Redux/actions/action";
import uuid from "react-uuid"
export default function Product({ id, nombre, imagen, precio }) {

//  const carrito = useSelector(state=>state.cartItems.map(carritos=>carritos.id))
  
  const dispatch = useDispatch();
  const usuario = useSelector((state)=>state.User)
  let cantidad=0
  const handleOnClick = () => {
    if(Object.values(usuario).length){
      if(usuario.idProductoCantidad){
        cantidad++
        let data={
          id,nombre,imagen,precio, cantidad,idProductoCantidad
        }
        dispatch(aniadirCarrito(data))
      }else{
        usuario.idProductoCantidad=uuid()
        cantidad++
        let data={
          id,nombre,imagen,precio, cantidad,idProductoCantidad
        }
        dispatch(aniadirCarrito(data))
      }
    }else{
      dispatch(addToCartGuest(id));
    }
  };


  return (
    <div className="tarjeta">
      <div className="tarjetaInterior">
        <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
          <div className="tarjeta-imagen">
            <img
              className="tarjeta-imagen-interior"
              src={imagen}
              alt="Y la Imagen?"
              width="100vw"
            />
          </div>
        </Link>
        <div className="nombre-precio-carrito">
          <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
            <div className="nombre-precio">
              <p className="product-nombre">{nombre}</p>
              <p className="product-precio">${precio}</p>
            </div>
          </Link>
          <div className="carrito-products">
            <button onClick={handleOnClick}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ color: "grey" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
