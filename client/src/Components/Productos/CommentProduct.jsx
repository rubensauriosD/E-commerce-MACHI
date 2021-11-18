import React, { useState } from "react";
import {  useSelector } from "react-redux";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/Comments.css";



function validate(input2) {
    let errors = {};
    if (!input2.comentarios) {
        errors.comentarios = "Por favor deja un comentario"
    }
    return errors;
}


export default function Comment({ text, id, setInput }) {
   // const dispatch = useDispatch();

    const [input2, setInput2] = useState({
        comentarios: "",
    })

    const [errors, setErrors] = useState({})


    const usuario = useSelector((state) => state.usuario.User)



    function HandleChange(e) {
        setInput2({
            ...input2,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input2,
            [e.target.name]: e.target.value
        }))


    }

    async function HandleSubmit() {
        await axios.post(`/comentarios/newComment`, { 
            ...input2,
            idUsuario: usuario,
            idProducto: id});

        swal("Enviado", "Gracias comentar sobre nuestros productos", "success");
        setInput2({
            comentarios: ""
        })
        setInput(false)
    }
    return (
        <div className="fondo-comment">
            <div className="container-comment">
                <textarea value={input2.comentarios} name="comentarios" onChange={(e) => HandleChange(e)} className="comment_text" id="" cols="30" rows="10"></textarea>
                {errors.comentarios && (
                    <p>{errors.comentarios}</p>
                )}
                <button disabled={!input2.comentarios} className="comment_text_bt" onClick={() => HandleSubmit()} >Enviar</button>
            </div>
        </div>
    )
}