import {useForm} from "react-hook-form"

export default function SignIn({SubmitS}){
    const {register,errors,handleSubmit}=useForm()
    const onSubmit=(data)=>{
        SubmitS(data)
    }
    return(
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("nombre",{required:true})} />
            <input {...register("apellido",{required:true})} />
            <input {...register("email",{required:true})} />
            <select {...register("tipo")}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <input type="password" {...register("contraseña",{required:true})} />
            <input type="submit" value="Iniciar Sesion"/>
        </form>
        </div>
    )
}