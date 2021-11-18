import React from 'react';


export default function Targeta_Factura({ comentarios, puntuacion, usuario}) {

    return (
        <div className="comment-container-card">
            {/* <div className="img-card-userName" > */}
            <div className='ParteDerechaComments'>
                <h5 className="comment-card-userName">{usuario}</h5>
                <p>{comentarios}</p>
                                <strong className='puntacionStyle'>Puntuación: <label className={parseInt(puntuacion) >= 1 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion)>= 2 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) >= 4 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) >= 3 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) === 5 ? 'estrellitaActiva' : 'EstrellitasGrises'} >★</label>
                                </strong>
                {/* </div> */}
            </div>
        </div>
    )
}