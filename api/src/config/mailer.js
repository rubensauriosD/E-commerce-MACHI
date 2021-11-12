const nodemailer = require("nodemailer");
//const { ADMIN_MAIL, ADMIN_PASS } = process.env


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      /* user: testAccount.user, 
      pass: testAccount.pass, */
      user: `machiwebsite@gmail.com`, //el mail de la compañia
      pass: `rubicworhysjygzy`, // la clave del gmail */
    },
    
  });
  //si tira error de credenciales uatofirmadas, desactivar el puto antivirus

module.exports = transporter;