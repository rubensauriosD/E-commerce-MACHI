import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addComentarios, getComentarios} from '../../../Redux/actions/productAction';
import swal from "sweetalert2";
import "../../../Styles/Comments.css";
import '../../../Styles/Estrellitas.css'


export default function Comment({ nombre, usuarioId, id, productoId, imagen}) {

    const [state, setState] = useState({
        comentarios: "",
        puntuacion: ""
    })

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.productos.comments.filter((c) => c.comentarios))

    useEffect(async() => {
        await dispatch(getComentarios(usuarioId))
        console.log('ESTE ES EL COMENTARIO', comments);
    }, [])

    const showAlert = (title, text) => {
        swal.fire({
            title: title,
            text: text,
            button: "Aceptar"
        })
        /* .then(value => {
            window.location.reload(false);
        }) */
    }

    function handleChange(e) {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function addComment() {
        const {comentarios, puntuacion} = state
        dispatch(addComentarios(usuarioId, productoId, comentarios, puntuacion))
        console.log("saofas",usuarioId, productoId, state.comentarios, state.puntuacion)
        await showAlert('Yei!,', 'se publicó tu comentario correctamente')
    }


    return (
        <div style={{ margin: 15 }}>Hey!, que tal tu producto?
            <div class="card">
                <div class="flip-card">
                    <div class="flip-card__container">
                        <div class="card-front">
                            <div class="card-front__tp card-front__tp--camping">
                                <img className="imagenFuera" src={imagen?imagen:null} alt="no esta la imagen"/>
                            </div>
                            <div class="card-front__bt">
                                <p class="card-front__text-view card-front__text-view--camping">{nombre}</p>
                            </div>
                        </div>
                        <div class="card-back">
                            <img className="imagenDentro" src={imagen?imagen:null} alt="no esta la imagen" />
                        </div>
                    </div>
                </div>
                <div class="inside-page">
                    <div class="inside-page__container">
                        <h3 class="inside-page__heading inside-page__heading--camping">Comentarios</h3>
                            {console.log('THIS IS ID PRODUCT', productoId)}
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
                                <p class="inside-page__text">
                                    <p className='text_important'>Dejanos una review</p>
                                    <strong>Comentario:</strong>
                                    <br/>
                                    <textarea className='textArea__class' maxLength="254" name='comentarios' value={state.comentarios} onChange={handleChange} id='' ></textarea>
                                    <br/>
                                    <strong>Puntua:</strong>
                                </p>
                                <form className='formEstrellitas'>
                                    <p className='clasificacion'>
                                        <input className='estrellitaTA' id={'F'+id} type="radio" name='puntuacion' onChange={handleChange} value='5'/>
                                        <label className='labelEstrellitas' for={'F'+id}>★</label>
                                        <input className='estrellitaTA' id={'G'+id} type="radio" name='puntuacion' onChange={handleChange} value='4'/>
                                       <label className='labelEstrellitas' for={'G'+id}>★</label>
                                       <input className='estrellitaTA' id={'H'+id} type="radio" name='puntuacion' onChange={handleChange} value='3'/>
                                       <label className='labelEstrellitas' for={'H'+id}>★</label>
                                       <input className='estrellitaTA' id={'I'+id} type="radio" name='puntuacion' onChange={handleChange} value='2'/>
                                       <label className='labelEstrellitas' for={'I'+id}>★</label>
                                       <input className='estrellitaTA' id={'J'+id} type="radio" name='puntuacion' onChange={handleChange} value='1'/>
                                       <label className='labelEstrellitas' for={'J'+id}>★</label>
                                    </p>
                                </form>
                                <button className="inside-page__btn inside-page__btn--camping" onClick={() => addComment()}>Aceptar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}