function UsuarioAutenticado(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Usuario no Autenticado" });
}
function UsuarioAutenticadoAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.tipo === "admin") {
    return next();
  }
  res.status(401).json({ error: "Usuario no Autenticado" });
}

module.exports = {
  UsuarioAutenticado,
  UsuarioAutenticadoAdmin,
};
