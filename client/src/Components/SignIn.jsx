import { useForm } from "react-hook-form";

export default function SignIn({ SubmitS }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    SubmitS(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("nombre", {
            required: {
              value: true,
              message: "nombre requerido",
            } /*,pattern:{value:/^(?=*[a-z])/,message:"sin numeros o simbolos"}*/,
          })}
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
        <input
          {...register("apellido", {
            required: { value: true, message: "apellido requerido" },
          })}
        />
        {errors.apellido && <p>{errors.apellido.message}</p>}
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "email requerido" },
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "email no valido",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <select
          {...register("tipo", {
            required: { value: true, message: "Selecciona tipo de Usuario" },
          })}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        {errors.tipo && <p>{errors.tipo.message}</p>}
        <input
          type="password"
          {...register("contrasenia", {
            required: { value: true, message: "contraseña requerida" },
            pattern: {
              value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
              message: "debe tener Min, Mayu, y un simbolo",
            },
          })}
        />
        {errors.contrasenia && <p>{errors.contrasenia.message}</p>}
        <input
          type="password"
          {...register("validarContrasenia", {
            required: {
              value: true,
              message: "Por favor escribe la contraseña otra vez",
            },
          })}
        />
        {errors.validacionContrasenia && (
          <p>{errors.validacionContrasenia.message}</p>
        )}
      </form>
    </div>
  );
}
