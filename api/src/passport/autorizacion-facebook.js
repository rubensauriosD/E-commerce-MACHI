const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const { Usuario } = require("../db");
passport.use(
  new FacebookStrategy(
    {
      clientID: "593541735027050",
      clientSecret: "f60d89eff6085886da441c385c43f8de",
      callbackURL: "https://e-commerce-machi.herokuapp.com/usuarios/auth/facebook/inicioDeSesion",
      profileFields:["id","name","photos","email","displayName"]
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const [usuario,creado]=await Usuario.findOrCreate({
          where: { facebookId: profile._json.id },
          defaults: { nombre: profile._json.first_name,tipo:"user",apellido:profile._json.last_name,fotoDePerfil:profile._json.picture.data.url },
        });
        return cb(null,usuario)
      } catch (e) {
        console.log(e);
        cd(e, false);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(async function(id, cb) {
    const usuario =await Usuario.findByPk(id);
    cb(null,usuario)
  });
