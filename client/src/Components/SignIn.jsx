import { Controller, useForm } from "react-hook-form";
import { Input, Button,Box,TextField,Alert } from "@mui/material";
import Select from "react-select";
export default function SignIn({ SubmitS }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    SubmitS(data);
  };
  return (
    <div>
      <h2>REGISTRATE YA!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box
      component="div"
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '20vw 20vw' },
        gap: 1, 
        maxHeight:"60vh",
        overflow:"auto",
      }}
    >
      <Controller 
        name="nombre"
        control={control}
        rules={{required: {value: true, message: "nombre requerido"}}}
        render={({field})=><TextField
          {...field}
          label="Ingresa Nombre"
          variant="filled"
          color="success"
        />}
        />
        {errors.nombre && <Alert  variant="filled" severity="error">{errors.nombre.message}</Alert>}
        <TextField
          {...register("apellido", {
            required: { value: true, message: "apellido requerido" },
          })}
          label="Ingresa Apellido"
          variant="filled"
          color="success"
        />
        {errors.apellido && <Alert variant="filled" severity="error">{errors.apellido.message}</Alert>}
        <TextField
          type="email"
          {...register("email", {
            required: { value: true, message: "email requerido" },
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "email no valido",
            },
          })}
          label="Ingresa tu correo electronico"
          variant="filled"
          color="success"
        />
        {errors.email && <Alert variant="filled" severity="error">{errors.email.message}</Alert>}
        <Controller
        name="tipo"
        control={control}
        rules={{required:true}}
        render={({field})=><Select
        {...field}
        options={[
          { value: "admin", label: "Administrador" },
          { value: "user", label: "Usuario" },
        ]}
        />}
        />
        {errors.tipo && <Alert variant="filled" severity="error">{errors.tipo.message}</Alert>}
        <TextField
          type="password"
          {...register("contrasenia", {
            required: { value: true, message: "contraseña requerida" },
            pattern: {
              value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
              message: "debe tener Min, Mayu, y un simbolo",
            },
          })} 
          label="Ingresa Contraseña"
          variant="filled"
          color="success"
        />
        {errors.contrasenia && <Alert variant="filled" severity="error">{errors.contrasenia.message}</Alert>}
        <TextField
          type="password"
          {...register("validarContrasenia", {
            required: {
              value: true,
              message: "Por favor escribe la contraseña otra vez",
            }
          })}
          label="Escribe de nuevo la contraseña"
          variant="filled"
          color="success"
        />
        {errors.validacionContrasenia && (
          <Alert variant="filled" severity="error">{errors.validacionContrasenia.message}</Alert>
        )}
        <Button variant="outlined" color="success" type="submit">Registrate</Button>
        </Box>
      </form>
    </div>
  );
}
