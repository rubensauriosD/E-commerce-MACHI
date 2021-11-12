const app = require('express').Router();
const {successMail}= require("../../utils/mailer");

app.post('/',successMail);
module.exports = app