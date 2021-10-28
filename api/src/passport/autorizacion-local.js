const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt-nodejs");
const Usuario = require("../models/usuarios");

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findByPk(id);
  done(null, usuario);
});

passport.use(
  "Inicio_de_Sesion",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "contrasenia",
      passReqToCallback: true,
    },  
    (req, email, contrasenia, done) => {
      const { nombre, apellido, tipo } = req.body;
      console.log("aca los datos: ",nombre,apellido,email,contrasenia,tipo)
      const GeneradorDeEncriptado = function (contrasenia) {
        return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
      };
      Usuario.findOne({ where: { email } }).then(
        (resultadoUsuario) => {
          if (resultadoUsuario) {
            return done(null, false, {
              message: "Ese email esta",
            });
          } else {
            const constraseniaUsuario = GeneradorDeEncriptado(contrasenia);
            const dato = {
              email,
              constrasenia: constraseniaUsuario,
              nombre: nombre,
              apellido: apellido,
              tipo: tipo,
            };
            Usuario.create(dato).then((nuevoUsuario, creado) => {
              if (!nuevoUsuario) {
                return done(null, false);
              }
              if (nuevoUsuario) {
                return done(null, nuevoUsuario);
              }
            });
          }
        }
      );
    }
  )
);
