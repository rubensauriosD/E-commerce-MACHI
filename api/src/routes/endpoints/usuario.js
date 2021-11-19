const app = require("express").Router();

const passport = require("passport");
const {
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  inicioDeSesion,
  pedidoCerrarSesion,
  inicioFacebook,
  CambioContraseñaUsuario,
  CambiarSeguridadDeContrasenia
} = require("../../utils/users");
const {
  UsuarioAutenticado,
  UsuarioAutenticadoAdmin,
} = require("../autorizacion/autorizacionPassport");

app.post(
  "/inicioSesion",
  passport.authenticate("Inicio_de_Sesion"),
  inicioDeSesion
);
app.post("/inicioSesionFacebook", UsuarioAutenticado, inicioFacebook);
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/inicioDeSesion",
  passport.authenticate("facebook", {
    failureMessage: "Error de autenticacion",
    successRedirect: `${
      process.env.DIRECCIONSUCCESFACEBOOK
        ? process.env.DIRECCIONSUCCESFACEBOOK + "/#/successLogin"
        : "http://localhost:3000/#/successLogin"
    }`,
  }),
  (req, res) => console.log(req.user)
);
app.get("/test", UsuarioAutenticadoAdmin, (req, res) =>
  res.json({ message: "success"})
);
app.get("/testUsuario", UsuarioAutenticado, (req, res) =>
  res.json({message: "success"})
);
app.route("/cerrarSesion").get(pedidoCerrarSesion);

app.route("/").get(UsuarioAutenticadoAdmin, getUsuario).post(postUsuario).put(CambioContraseñaUsuario);


app
  .route("/:id")
  .put(putUsuario)
  .delete(deleteUsuario);

module.exports = app;
