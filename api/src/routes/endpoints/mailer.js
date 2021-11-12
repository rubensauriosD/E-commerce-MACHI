const app = require('express').Router();
const {successMail}= require("../../utils/mailer");

app.get('/',successMail);
module.exports = app