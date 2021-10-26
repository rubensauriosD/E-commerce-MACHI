import {useForm} from "react-hook-form"

export default function Login({SubmitL}){
    const {register,errors,handleSubmit}=useForm()
    const onSubmit=(data)=>{
        SubmitL(data)
    }
    return(
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email",{required:true})} />
            <input type="password" {...register("contraseña",{required:true})} />
            <input type="submit" value="Iniciar Sesion"/>
        </form>
        </div>
    )
}