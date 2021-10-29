import { useForm } from "react-hook-form"

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <input
            type="password"
            {...register("contrasenia", {
              required: { value: true, message: "contraseña es requerida" },
              pattern: {
                value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                message: "debe tener Min, Mayu, y un simbolo",
              },
            })}
          />
          {errors.contrasenia && <p>{errors.contrasenia.message}</p>}
          <input type="submit" value="Iniciar Sesion" />
        </form>
      </div>
    );
  }