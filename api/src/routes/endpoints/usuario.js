const app = require("express").Router();

const passport = require("passport");
const {
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  inicioDeSesion,
  pedidoCerrarSesion,
  inicioFacebook
} = require("../../utils/users");
const { UsuarioAutenticado } = require("../autorizacion/autorizacionPassport");

app.post(
  "/inicioSesion",
  passport.authenticate("Inicio_de_Sesion"),
  inicioDeSesion
);
app.get("/inicioSesionFacebook",UsuarioAutenticado,inicioFacebook)
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/inicioDeSesion",
  passport.authenticate("facebook", {
    failureMessage: "Error de autenticacion",
    successRedirect: `${process.env.DIRECCIONSUCCESFACEBOOK}/successLogin`||"http://localhost:3000/#/successLogin",
  }),
  (req, res) => console.log(req.user)
);
app.get("/test", UsuarioAutenticado, (req, res) =>
  res.json({ message: succes, usuario: req.user })
);
app.route("/cerrarSesion").get(pedidoCerrarSesion);

app.route("/").get(getUsuario).post(postUsuario);

app.route("/:id").put(putUsuario).delete(deleteUsuario);

module.exports = app;