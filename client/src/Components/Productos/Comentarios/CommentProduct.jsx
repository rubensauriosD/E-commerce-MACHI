import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography'
import {addComentarios, getComentarios} from '../../../Redux/actions/productAction';
import swal from "sweetalert";
import "../../../Styles/Comments.css";
import '../../../Styles/Estrellitas.css'


export default function Comment({ nombre, usuarioId, id, productoId, imagen}) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [comentarios,setComentarios]=useState("");
    const [puntuacion,setPuntuacion]=useState(0);
    //comentar esto tambn
    
    // const [state, setState] = useState({
        //     comentarios: "",
        //     puntuacion: ""
        // })
        
        
        useEffect(() => {
            dispatch(getComentarios(productoId))
        }, [dispatch, productoId])
        
        const comments = useSelector((state) => state.productos.comments.filter((c) => c.comentarios))
    function handleChange(e) {
        setComentarios(e.target.value)
        // setState({
        //     ...state,
        //     [e.target.name]: e.target.value
        // })
    }

    async function addComment(e) {
        // const {comentarios, puntuacion} = state
        dispatch(addComentarios(usuarioId, productoId, comentarios, puntuacion))
        swal('Yei!,', 'se publicó tu comentario correctamente')
        //history.push("/");
    }
    const yaComentados=comments?.filter(comentarios => comentarios.productoId === productoId)
    return (
        <div style={{ margin: 15 }}>Hey!, que tal tu producto?
            <div className="card">
                <div className="flip-card">
                    <div className="flip-card__container">
                        <div className="card-front">
                            <div className="card-front__tp card-front__tp--camping">
                                <img className="imagenFuera" src={imagen?imagen:null} alt="no esta la imagen"/>
                            </div>
                            <div className="card-front__bt">
                                <p className="card-front__text-view card-front__text-view--camping">{nombre}</p>
                            </div>
                        </div>
                        <div className="card-back">
                            <img className="imagenDentro" src={imagen?imagen:null} alt="no esta la imagen" />
                        </div>
                    </div>
                </div>
                <div className="inside-page">
                    <div className="inside-page__container">
                        <h3 className="inside-page__heading inside-page__heading--camping">Comentarios</h3>
                            {/* {console.log('THIS IS ID PRODUCT', productoId)} */}
                            

                            {comments?.find(comentarios => comentarios.productoId === productoId) ?
                                <div>
                                    <strong className='commentaryDescrip'>Ya Comentaste este producto, Gracias</strong>
                                    {/* cambiar esto tambien */}
                                    <div className='commentaryStyle'>{comments[comments?.findIndex(comment => comment.productoId === productoId)].comentarios}
                                    
                                        <strong className='puntacionStyle'>Puntuacion
                                            <label className={parseInt(comments[comments?.findIndex(comment => comment.productoId === productoId)].puntuacion) >=1 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
                                            <label className={parseInt(comments[comments?.findIndex(comment => comment.productoId === productoId)].puntuacion) >=2 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
                                            <label className={parseInt(comments[comments?.findIndex(comment => comment.productoId === productoId)].puntuacion) >=3 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
                                            <label className={parseInt(comments[comments?.findIndex(comment => comment.productoId === productoId)].puntuacion) >=4 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
                                            <label className={parseInt(comments[comments?.findIndex(comment => comment.productoId === productoId)].puntuacion) === 5 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
                                        </strong>
                                    </div>
                                </div>
                            :
                            <div>
                                <div className="inside-page__text">
                                    <p className='text_important'>Dejanos una review</p>
                                    <strong>Comentario:</strong>
                                    <br/>
                                    <textarea className='textArea__class' maxLength="254" name='comentarios' value={comentarios} onChange={handleChange} id='' ></textarea>
                                    <br/>
                                    <strong>Puntua:</strong>
                                </div>
                                <form className='formEstrellitas'>
                                    {/* <div className='clasificacion'> */}
                                        <Rating
                                            name="simple-controlled"
                                            value={puntuacion}
                                            onChange={(event, newValue) => {
                                            setPuntuacion(newValue);
                                            }}
                                        />
                                    {/* //</div> */}
                                </form>
                                <button className="inside-page__btn inside-page__btn--camping" onClick={addComment}>Aceptar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}