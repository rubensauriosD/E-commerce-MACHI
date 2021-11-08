import "../Styles/DetalleProducto.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router'
import {getProductId, removeProduct, addToCartGuest} from "../Redux/actions/action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getComentarios } from "../Redux/actions/action";
import CommentProduct from "../Components/Productos/CommentProduct"
import "../Styles/Comments.css";


export default function DetalleProducto({props, id}){

    const {Product} =useSelector(state=>state)
    const dispatch=useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getComentarios(id))
    }, [getComentarios])

    const comments = useSelector((state) => state.comentarios)
    const productComment = comments.filter((c) => c.idProducto === id)

    const [input, setInput] = useState(false);
    const [datos, setDatos] = useState({});
    const handleClik = (e) => {
        if (input === false) {
            setInput(true)
            setDatos(e)
        } else {
            setInput(false)
        }
    }

    const handleOnClick = () => {
        dispatch(addToCartGuest(Product.id));
    };

    useEffect(()=>{
        dispatch(getProductId(props))
        return()=>{
            dispatch(removeProduct())
        }
    },[dispatch,props])

    const goToBack = ()=>{
        history.goBack()
    }

    return(
        <div className="infoContainer">
            <div className="allInfo">
                <img className="imgInfo" src={Product.imagen}alt="Y la imagen?"/>
                <div className="textInfo">
                    <h1 className="nameInfo">{Product.nombre}</h1>
                    <p className="categoryInfo">{Product.categoria}</p>
                    <p className="priceInfo">$ {Product.precio}</p>
                    <p className="desInfo">Descripción: {Product.descripcion}</p>
                    <div className="carrito-products">
                        <button onClick={handleOnClick}>
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                style={{ color: "grey" }}/>
                        </button>
                    </div>
                </div>
                <div>
                    <div>Deja tu comentario
                        <div>
                            <CommentProduct setInput={() => setInput()} id=     {datos.id} text="Dejá una reseña de nuestro producto" >
                            </CommentProduct>
                        </div>
                        <div className="comm-scrll">
                            {
                                productComment?.map((e) => {
                                    return (
                                        <div>
                                            <div key={e.id} value={e.id} className="commentsCont">
                                                <p key={e.id} value={e.id} className="conte">{e.comentarios}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <button className="infoButton" onClick={goToBack}>⏪Volver a la Tienda</button>
        </div>
    )
}