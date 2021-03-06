import "../Styles/DetalleProducto.css";
import { Button, Alert} from '@mui/material';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  addToCartGuest,
  CambiarCantidadDb,
  aniadirObjetoCarritoDb,
} from "../Redux/actions/cartAction";
import { v4 as uuidv4 } from "uuid";
import {
  getProductId,
  removeProduct,
  getComentarios,
} from "../Redux/actions/productAction";
import ShowComment from '../Components/Productos/Comentarios/ShowComment'
import "../Styles/Comments.css";

export default function DetalleProducto({ props }) {
  console.log(props)
  const { Product, comments } = useSelector((state) => state.productos);
  const usuario = useSelector((state) => state.usuario.User);
  const objetosCarrito = useSelector((state) => state.cart.itemsCarritoDb);
  const dispatch = useDispatch();
  const history = useHistory();
  const [nombre, imagen, precio, id, disponibilidad] = [
    Product.nombre,
    Product.imagen,
    Product.precio,
    Product.id,
    Product.disponibilidad
  ];
  useEffect(() => {
    dispatch(getComentarios(props));
  }, [ dispatch, props]);

  const productComment = comments.filter((c) => c.productoId === props);

  const handleOnClick = () => {
    if (usuario.id) {
      const data = { nombre, imagen, precio };
      const objetoEncontrado = objetosCarrito.find(
        (objeto) => objeto.idProducto === id
      );
      if (objetoEncontrado) {
        dispatch(CambiarCantidadDb(objetoEncontrado.idCarrito, 1));
        //dispatch(añadirCarritoPost(data))
      } else {
        data.idCarrito = uuidv4();
        data.idProducto = id;
        dispatch(aniadirObjetoCarritoDb(data));
      }
    } else {
      dispatch(addToCartGuest(id));
    }
  };

  useEffect(() => {
    dispatch(getProductId(props));
    return () => {
      dispatch(removeProduct());
    };
  }, [dispatch, props]);

  const goToBack = () => {
    history.goBack();
  };

  return (
    <div className="infoContainer">
      <div className="allInfo">
        <img className="imgInfo" src={Product.imagen} alt="Y la imagen?" />
        <div className="textInfo">
          <h1 className="nameInfo">{Product.nombre}</h1>
          <p className="categoryInfo">{Product.categoria}</p>
          <p className="priceInfo">$ {Product.precio}</p>
          <p className="desInfo">Descripción: {Product.descripcion}</p>
          <div className="carrito-products">
            { !disponibilidad ? <Alert severity="warning">Sin Stock</Alert> :
            <Button variant="outlined" onClick={handleOnClick}>Agregar al Carrito</Button>
            }
          </div>
        </div>
        <div>
        </div>
      </div>
          { !!comments.length &&
          <div>
            <h4>Reseñas del producto</h4>
            <div className="comm-scrll">
                            {
                                productComment?.length !== 0 ?
                                productComment?.map((e) => <ShowComment
                                key={e.id} 
                                value={e.id} 
                                comentarios={e.comentarios}
                                puntuacion={e.puntuacion}
                                usuario={e.usuario.nombre}
                                productoId={e.productoId}
                                ></ShowComment>) :
                                <div>No hay comentarios</div>
                            }
                        </div>
          </div>
          }
      <br/>
      <Button className="infoButton" variant="outlined" onClick={goToBack}>
        ⏪Volver a la Tienda
      </Button>
    </div>
  );
}
