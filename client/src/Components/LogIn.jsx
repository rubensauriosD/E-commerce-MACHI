import { useForm } from "react-hook-form"
import {Button, TextField,Box,Alert} from "@mui/material"
export default function Login({ SubmitL }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      SubmitL(data);
    };
    return (
      <div>
        <h2>Inicia Sesion con tu Cuenta Machi</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box
        component="div"
        sx={{
          display:"grid",
          gridTemplateColumns:{sm:"45vw"},
          gap:2,
        }}
        >
          <TextField
            sx={{justifySelf:"center"}}
            type="email"
            label="Ingresa tu Correo Machi"
            color="success"
            {...register("email", {
              required: { value: true, message: "email requerido" },
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: "email no valido",
              },
            })}
          />
          {errors.email && <Alert severity="warning"  sx={{justifySelf:"center"}}>{errors.email.message}</Alert>}
          <TextField
           sx={{justifySelf:"center"}}
            type="password"
            label="Ingresa tu Contraseña"
            color="success"
            {...register("contrasenia", {
              required: { value: true, message: "contraseña es requerida" },
              pattern: {
                value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                message: "debe tener Min, Mayu, y un simbolo",
              },
            })}
          />
          {errors.contrasenia && <Alert  sx={{justifySelf:"center"}} severity="warning">{errors.contrasenia.message}</Alert>}
          <Button  sx={{justifySelf:"center"}} variant="contained" color="success" type="submit">Iniciar Sesión</Button>
          </Box>
        </form>
      </div>
    );
  }