import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import {addComentarios, getComentarios} from '../../../Redux/actions/productAction';
import swal from "sweetalert";
import "../../../Styles/Comments.css";
import '../../../Styles/Estrellitas.css'


export default function Comment({ nombre, usuarioId, id, productoId, imagen}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector((state) => state.productos.comments.filter((c) => c.comentarios))

    const [state, setState] = useState({
        comentarios: "",
        puntuacion: ""
    })


    useEffect(() => {
        dispatch(getComentarios(productoId))
    }, [dispatch, productoId])

    function handleChange(e) {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function addComment(e) {
        console.log("llego")
        const {comentarios, puntuacion} = state
        dispatch(addComentarios(usuarioId, productoId, comentarios, puntuacion))
        swal('Yei!,', 'se publicó tu comentario correctamente')
        //history.push("/");
    }


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
                                    <strong className='commentaryDescrip'>Dejanos tu comentarios</strong>
                                    <div className='commentaryStyle'>{comments[comments?.findIndex(comment => comment.productoId === productoId)].comentarios}
                                        <strong className='puntacionStyle'>Puntuacion
                                            <label className={parseInt(comments[0].puntuacion) >=1 ? 'estrellitaActiva' : 'EstrellitasGrises' }>★</label>
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
                                    <textarea className='textArea__class' maxLength="254" name='comentarios' value={state.comentarios} onChange={handleChange} id='' ></textarea>
                                    <br/>
                                    <strong>Puntua:</strong>
                                </div>
                                <form className='formEstrellitas'>
                                    {/* <div className='clasificacion'> */}
                                        <input className='estrellitaTA' id={'F'+id} type="radio" name='puntuacion' onChange={handleChange} value='5'/>
                                        <label className='labelEstrellitas' htmlFor={'F'+id}>★</label>
                                        <input className='estrellitaTA' id={'G'+id} type="radio" name='puntuacion' onChange={handleChange} value='4'/>
                                       <label className='labelEstrellitas' htmlFor={'G'+id}>★</label>
                                       <input className='estrellitaTA' id={'H'+id} type="radio" name='puntuacion' onChange={handleChange} value='3'/>
                                       <label className='labelEstrellitas' htmlFor={'H'+id}>★</label>
                                       <input className='estrellitaTA' id={'I'+id} type="radio" name='puntuacion' onChange={handleChange} value='2'/>
                                       <label className='labelEstrellitas' htmlFor={'I'+id}>★</label>
                                       <input className='estrellitaTA' id={'J'+id} type="radio" name='puntuacion' onChange={handleChange} value='1'/>
                                       <label className='labelEstrellitas' htmlFor={'J'+id}>★</label>
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