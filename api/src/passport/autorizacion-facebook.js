const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const { Usuario } = require("../db");
passport.use(
  new FacebookStrategy(
    {
      clientID: "593541735027050",
      clientSecret: "f60d89eff6085886da441c385c43f8de",
      callbackURL: "http://localhost:3001/usuarios/auth/facebook/inicioDeSesion",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const [usuario,creado]=await Usuario.findOrCreate({
          where: { facebookId: profile.id },
          defaults: { nombre: profile._json.name,tipo:"user" },
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