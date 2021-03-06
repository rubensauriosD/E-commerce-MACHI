const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/utils/middlewares/errorHandler");
const setHeaders = require("./src/utils/middlewares/setHeaders");
const { conn } = require("./src/db");
const passport = require("passport");
const session = require("express-session");
const app = express();
//Inicializaciones
require("./src/passport/autorizacion-local");
require("./src/passport/autorizacion-facebook");
// configuraciones

app.set("puerto", process.env.PORT || 3001); //puerto que pide heroku para el deploy

// app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(setHeaders);
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
process.env.COOKIE
  ? app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: { sameSite: "none", secure: true },
      })
    )
  : app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
      })
    );
app.use(passport.initialize());
app.use(passport.session());
//CREAR MIDDLEWARE PARA AUTENTICACIONES
app.use("/", routes);
app.use(errorHandler);
//precargar un usuario y un admin
const { becomeAdmin } = require("./src/utils/users");

conn.sync({ force: false }).then(async () => {
  const preloadAdmin = await becomeAdmin();
  console.log("Base de Datos conectada");
  app.listen(app.get("puerto"), () => {
    //puerto que pide heroku para el deploy
    console.log(`Escuchando en puerto ${app.get("puerto")}`);
  });
});
