import React, { useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import ContactCSS from "../Styles/Contact.module.css";
import emailjs from "emailjs-com";

// import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8m4hjzl",
        "template_38g1y4g",
        form.current,
        "user_xVzHzwzc8dzpIqdmZiQdz"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setDone(true);
  };
  setTimeout(() => {
    setDone(false);
  }, 5000);
  return (
    <div className={ContactCSS.wrapper}>

      <div className={ContactCSS.icons_container}>
        <h2>Contacto</h2>
        <i>
          <div className={ContactCSS.icon_decoration}>
            <PhoneIcon />
          </div>
          <a href="https://wa.me/543512900724?text=Hola%20Machi,%20tengo%20una%20consulta!%20">+54 351 290-0724</a>
        </i>
        <i>
          <div className={ContactCSS.icon_decoration}>
            <MailIcon />
          </div>
          <a href="mailto:machiwebsite@gmail.com">machiwebsite@gmail.com</a>
        </i>
      </div>
      
      <div className={ContactCSS.form_container}>
        {done && <h3>Gracias por contactarnos, te contestaremos por email a la brevedad</h3>}
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="phone">Telefono</label>
          <input type="tel" id="phone" name="phone" required />
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" required></textarea>
          <button style={{marginBottom:"120px"}}>Send </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
