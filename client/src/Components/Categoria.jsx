import { Link } from "react-router-dom";
import CategoryCSS from "../Styles/Categories.module.css";

export default function Categoria({ nombreCategoria, imagenCategoria }) {
  return (
    <Link to={`/tienda/${nombreCategoria}`} className={CategoryCSS.link}>
      <figure className={CategoryCSS.figure}>
        <figcaption>{nombreCategoria}</figcaption>
        <img src={imagenCategoria} alt={nombreCategoria} />
      </figure>
    </Link>
  );
}
{
  /* <div styles={`background-image:url(${imagenCategoria}); background-size:30vw 20vh`}>
<div>
  <p>{nombreCategoria}</p>
  <img src={imagenCategoria} alt="sin imagen" />
</div> */
}
{
  /* <figure>
<img src="/media/cc0-images/elephant-660-480.jpg"
   alt="Elephant at sunset">
<figcaption>An elephant at sunset</figcaption>
</figure> */
}
