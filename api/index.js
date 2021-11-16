const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/utils/middlewares/errorHandler");
const setHeaders = require("./src/utils/middlewares/setHeaders");
const { conn } = require("./src/db");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors')
const app = express();
//Inicializaciones
require("./src/passport/autorizacion-local");
require("./src/passport/autorizacion-facebook");
// configuraciones

app.set("puerto", process.env.PORT || 3001); //puerto que pide heroku para el deploy

app.use(cors({credentials: true, origin: 'https://6193cf628aa05f200450a3e9--laughing-fermi-226ba3.netlify.app/'}));
// app.use(setHeaders);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
//   });
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "eMachiComercioWebPage",
    resave: false,
    saveUninitialized: false,
    // cookie:{sameSite:true,secure:true}
  })
);
app.use(passport.initialize());
app.use(passport.session());
//CREAR MIDDLEWARE PARA AUTENTICACIONES
app.use("/", routes);
app.use(errorHandler);
//precargar un usuario y un admin
const { becomeAdmin, becomeUser } = require("./src/utils/users");

conn.sync({ force: true }).then(async () => {
  const preloadAdmin = await becomeAdmin();
  const preloadUser = await becomeUser();
  console.log("Base de Datos conectada");
  app.listen(app.get("puerto"), () => {
    //puerto que pide heroku para el deploy
    console.log(`Escuchando en puerto ${app.get("puerto")}`);
  });
});
