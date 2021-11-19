import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { nuevaContraseña, pedirUsuarioPorToken } from "../Redux/actions/userAction";
import {useDispatch, useSelector} from "react-redux"
import { useEffect} from "react";
import swal from 'sweetalert';


export default function NuevaContrasenia({props}) {
  console.log("aca llega el token",props)
  const dispatch=useDispatch()
  useEffect(()=>{
     dispatch(pedirUsuarioPorToken(props))
   },[dispatch,props])

   
   const {
     control,
     formState: { errors },
     handleSubmit,
     reset,
    } = useForm();
    
  const {User} = useSelector((state) => state.usuario);
  console.log(User);
  const mail = User.email;

  const handleOnSubmit = (data) => {
      console.log(data)
    const {nuevaContrasenia} = data
    dispatch(nuevaContraseña(nuevaContrasenia,mail));
    reset({ nuevaContrasenia: "", repetirContrasenia: "" });
    swal('Tu contraseña ha cambiado! Cierra sesión para volver a entrar')
  };

  return (
    
    <Box component="div" sx={{display:"grid",gap:1}}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Controller
          name="nuevaContrasenia"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "input requerido" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              message: "Debe tener 8 caracteres, minus, mayus y un numero",
            },
          }}
          render={({ field }) => (
            <TextField
              type="password"
              {...field}
              color={errors.nuevaContrasenia? "error" : "success"}
              label="ingresa la nueva contraseña"
              helperText={
                errors.nuevaContrasenia
                  ? errors.nuevaContrasenia.message
                  : ""
              }
              variant="filled"
            />
          )}
        />
        <Controller
          name="repetirContrasenia"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "input requerido" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              message: "Repite la nueva contraseña",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label ="repite la contraseña ingresada"
              color={errors.repetirContrasenia ? "error" : "success"}
              helperText={
                errors.repetirContrasenia
                  ? errors.repetirContrasenia.message
                  : ""
              }
              variant="filled"
            />
          )}
        />
        <Button type="submit" variant="contained">Cambiar Contraseña</Button>
      </form>
    </Box>
  );
}
