// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {nuevaContraseña} from "../Redux/actions/userAction";

// export default function NuevaContraseña({email}) {
//     const dispatch = useDispatch()
//     const [contrasenia, setContrasenia] = useState("");
//     const onSubmit = (e) => {
//         e.preventDefault();
//         dispatch(nuevaContraseña({contrasenia, email}))
//         setContrasenia("");
//         alert("Su contraseña fue cambiada con exito")
//         setTimeout(() => {
//             window.close()
//         },3000)
//     }
//     return  (
//         <form onSubmit={onSubmit}>
//             <div>
//                 <label name="email">{email}</label>
//                 <input name="contrasenia" type="password" label="Ingresa tu nueva contraseña"/>
//             </div>
//             <button type="submit">CAMBIAR CONTRASEÑA</button>
//         </form>
//     );
// }