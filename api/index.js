const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/utils/middlewares/errorHandler");
const setHeaders = require("./src/utils/middlewares/setHeaders");
const { conn } = require("./src/db");
const passport = require("passport");
const session = require("express-session");
const cors=require("cors")
const app = express();
//Inicializaciones
require("./src/passport/autorizacion-local");
require("./src/passport/autorizacion-facebook")
// configuraciones
app.set("puerto", process.env.PORT || 3001);//puerto que pide heroku para el deploy
//
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(setHeaders);
app.use(
    session({
      secret: "eMachiComercioWebPage",
      resave: false,
      saveUninitialized: false
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  //CREAR MIDDLEWARE PARA AUTENTICACIONES
  app.use("/", routes);
  app.use(errorHandler);
  
  conn.sync({ force: true }).then(() => {
    console.log("Base de Datos conectada");
    app.listen(app.get("puerto"), () => {//puerto que pide heroku para el deploy
      console.log(`Escuchando en puerto ${app.get("puerto")}`);
    });
  });