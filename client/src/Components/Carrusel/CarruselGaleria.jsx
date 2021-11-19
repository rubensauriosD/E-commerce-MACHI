import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CarruselStyle.css";
import { getImages } from "../../Redux/actions/imageAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function CarruselGaleria() {
  const container = useRef(null);
  const intervalContainer = useRef(null);

  const dispatch = useDispatch();
  let imagenes = useSelector(state => state.imagen.Images)

  useEffect(()=>{
      dispatch(getImages())
  },[dispatch])
  
  function handleNext() {
    if (container.current && container.current.children.length > 0) {
      //obteniendo primer elemento del container
      const firstElement = container.current.children[0];
      //transicion para el container
      container.current.style.transition = `1000ms ease-out all`;
      const tamañoImg = container.current.children[0].offsetWidth;
      //movimiento
      container.current.style.transform = `translateX(-${tamañoImg}px)`;

      function transicion() {
        //se reinicia la posicion de la imagen
        container.current.style.transition = "none";
        container.current.style.transform = `translateX(0)`;
        //tomo primer elemento y lo mando al final
        container.current.appendChild(firstElement);
        container.current.removeEventListener("transitionend", transicion);
      }
      container.current.addEventListener("transitionend", transicion);
    }
  }

  function handlePrev() {
    if (container.current && container.current.children.length > 0) {
      //obtenemos al ultimo elemento
      const indexLast = container.current.children.length - 1;
      const lastElement = container.current.children[indexLast];
      container.current.insertBefore(lastElement, container.current.firstChild);

      container.current.style.transition = "none";
      const tamañoImg1 = container.current.children[0].offsetWidth;
      container.current.style.transform = `translateX(-${tamañoImg1}px)`;

      setTimeout(() => {
        container.current.style.transition = "1000ms ease-out all";
        container.current.style.transform = `translateX(0)`;
      }, 1000);
    }
  }

  useEffect(() => {
    intervalContainer.current = setInterval(() => {
      handleNext();
    }, 10000);
    container.current.addEventListener("mouseenter", () => {
      clearInterval(intervalContainer.current);
    });
    container.current.addEventListener("mouseleave", () => {
      intervalContainer.current = setInterval(() => {
        handleNext();
      }, 10000);
    });
  }, []);

  let numGal = (imagenes.length +'00%' )
  console.log(numGal)

  return (
    <div>
    <h1>Nuestros Clientes Felices</h1>
      <div className="container-slider-galeria">
        <div className="slider" style={{width: numGal}} id="slider" ref={container}>
               {imagenes&&imagenes.map((imagen, i) => {
                    return(
                        <div className="slider_section" key={imagen.id}>
                            <img src={imagen.imagen} alt="imagen galeria" className="slider_img"/>
                        </div>)               
                })}
        </div>
        <div
          className="slider_btn slider_btn-left"
          id="btn-left"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          className="slider_btn slider_btn-right"
          id="btn-right"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}
