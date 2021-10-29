

export default function InterfazDeUsuario({datosUsuario}){
    return(
        <div>
            <h1>{datosUsuario.nombre+" "+datosUsuario.apellido}</h1>
            <h3>{datosUsuario.email}</h3>
            <h4>{datosUsuario.tipo}</h4>
            <button>CerrarSesion</button>
        </div>
    )
}