const app = require('express').Router();
const {successMail}= require("../../utils/mailer.js");

app.get('/',successMail);
module.exports = app