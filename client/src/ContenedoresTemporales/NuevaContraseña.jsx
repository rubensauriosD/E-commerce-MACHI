import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { nuevaContraseña, pedirUsuarioPorToken } from "../Redux/actions/userAction";
import {useDispatch} from "react-redux"
import { useEffect} from "react"
export default function NuevaContrasenia({props}) {
    console.log("aca llega el token",props)

     const dispatch=useDispatch()
     useEffect(()=>{
       dispatch(pedirUsuarioPorToken(props))
     },[dispatch,props])
     console.log(props);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleOnSubmit = (data) => {
      console.log(data)
    //dispatch(nuevaContraseña({nuevaContrasenia, props.email}));
    reset({ nuevaContrasenia: "", repetirContrasenia: "" });
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "Debe tener minus, mayus y un simbolo",
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "Debe tener minus, mayus y un simbolo",
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
