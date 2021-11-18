const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt-nodejs");
const {Usuario,Producto, Carrito} = require("../db");

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
     // console.log("aca los datos: ",email,contrasenia)
      const ComparadorDeEncriptado = function (contraseniaEnviada,contraseniaEnBaseDeDatos) {
       // console.log("Lo que llega al comparar: ",bCrypt.compareSync(contraseniaEnviada,contraseniaEnBaseDeDatos))
        return bCrypt.compareSync(contraseniaEnviada,contraseniaEnBaseDeDatos)
      };
      Usuario.findOne({ where: { email }, include:{model:Carrito}}).then(
        (resultadoUsuario) => {
          //console.log("Aca los Datos en passport: ",resultadoUsuario&&resultadoUsuario.contrasenia)
          if (!resultadoUsuario) {
            return done(null, false, {
              message: "Error en Login",
            });
          } else if(ComparadorDeEncriptado(contrasenia,resultadoUsuario.contrasenia) ){
            return done(null,resultadoUsuario)
          }else{
            return done(null,false)
          } 
        }
      );
    }
  )
);