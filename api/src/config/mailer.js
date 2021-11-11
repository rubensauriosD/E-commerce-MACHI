const nodemailer = require("nodemailer");
//const { ADMIN_MAIL, ADMIN_PASS } = process.env

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `Machiwebsite@gmail.com`, //el mail de la compañia
      pass: `rubi cwor hysj ygzy`, // la clave del gmail
    },
  });