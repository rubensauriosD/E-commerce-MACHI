import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Box, Alert } from "@mui/material";
import { useHistory } from "react-router";
export default function Login({ SubmitL }) {
  const history=useHistory()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) => {
    SubmitL(data);
  };
  const redirectToReset=()=>{
    history.push("/reset")
  }


  return (
    <div>
      <h2>Inicia Sesion con tu Cuenta Machi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "45vw" },
            gap: 2,
          }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "email requerido" },
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: "email no valido",
              },
            }}
            render={({ field }) => 
              <TextField
              {...field}
                sx={{ justifySelf: "center" }}
                type="email"
                label="Ingresa tu Correo Machi"
                color="success"
              />
            }
          />

          {errors.email && (
            <Alert severity="warning" sx={{ justifySelf: "center" }}>
              {errors.email.message}
            </Alert>
          )}
          <Controller
          name="contrasenia"
          control={control}
          defaultValue=""
          rules={{ required: { value: true, message: "contraseña es requerida" },
          pattern: {
            // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: "debe tener Min, Mayu, y un simbolo",
          }}}
          render={({field})=>
            <TextField
            {...field}
            sx={{ justifySelf: "center" }}
            type="password"
            label="Ingresa tu Contraseña"
            color="success"
          />
          }
          />
          {errors.contrasenia && (
            <Alert sx={{ justifySelf: "center" }} severity="warning">
              {errors.contrasenia.message}
            </Alert>
          )}
          <Button
            sx={{ justifySelf: "center" }}
            variant="contained"
            color="success"
            type="submit"
          >
            Iniciar Sesión
          </Button>
          <Button
            sx={{ justifySelf: "center" }}
            variant="contained"
            color="warning"
            onClick={redirectToReset}
          >
            Olvidaste tu contraseña?
          </Button>
        </Box>
      </form>
    </div>
  );
}
