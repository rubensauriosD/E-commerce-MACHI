const app = require('express').Router();
const {successMail, resetPassword,traerUsuarioPorToken, }= require("../../utils/mailer");

app.post('/',successMail);
app.post('/reset',resetPassword);
app.get('/reset/:token', traerUsuarioPorToken )
module.exports = app