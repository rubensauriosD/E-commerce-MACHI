import { Controller, useForm } from "react-hook-form";
import { Button, Box, TextField, Alert, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function SignIn({ SubmitS, submitFace }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    SubmitS(data);
    reset({
      nombre:"",
      apellido:"",
      email:"",
      contrasenia:"",
      validarContrasenia:""
    });
  };
  return (
    <div>
      <h2>REGISTRATE YA!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "20vw 20vw" },
            gap: 1,
            maxHeight: "60vh",
            overflow: "auto",
          }}
        >
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: "nombre requerido" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ingresa Nombre"
                variant="filled"
                color="success"
              />
            )}
          />
          {errors.nombre && (
            <Alert variant="filled" severity="error">
              {errors.nombre.message}
            </Alert>
          )}
          <Controller
            name="apellido"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: "apellido requerido" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ingresa Apellido"
                variant="filled"
                color="success"
              />
            )}
          />
          {errors.apellido && (
            <Alert variant="filled" severity="error">
              {errors.apellido.message}
            </Alert>
          )}
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
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Ingresa tu correo electronico"
                variant="filled"
                color="success"
              />
            )}
          />
          {errors.email && (
            <Alert variant="filled" severity="error">
              {errors.email.message}
            </Alert>
          )}
          <Controller
            name="contrasenia"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "contraseña requerida" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message: "debe tener Min, Mayu, y un simbolo",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Ingresa Contraseña"
                variant="filled"
                color="success"
              />
            )}
          />
          {errors.contrasenia && (
            <Alert variant="filled" severity="error">
              {errors.contrasenia.message}
            </Alert>
          )}
          <Controller
            name="validarContrasenia"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Por favor escribe la contraseña otra vez",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Escribe de nuevo la contraseña"
                variant="filled"
                color="success"
              />
            )}
          />
          {errors.validacionContrasenia && (
            <Alert variant="filled" severity="error">
              {errors.validacionContrasenia.message}
            </Alert>
          )}
          <Button variant="outlined" color="success" type="submit">
            <Typography>Registrate</Typography>
          </Button>
          <Button variant="contained" onClick={submitFace}>
            <FacebookIcon fontSize="large" />
            <Typography>Registrate con facebook</Typography>
          </Button>
        </Box>
      </form>
    </div>
  );
}
