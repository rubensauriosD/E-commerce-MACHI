const app = require('express').Router();
const {successMail, resetPassword}= require("../../utils/mailer");

app.post('/',successMail);
app.post('/reset',resetPassword);
module.exports = app