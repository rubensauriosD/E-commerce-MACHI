import React, {useRef, useEffect} from "react"
import "./CarruselStyle.css"
import img1 from "./img/img1.jpg"
import img2 from "./img/img2.jpg"
import img3 from "./img/img3.jpg"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export default function Carrusel(){
    
    const container= useRef(null)
    const intervalContainer= useRef(null)

       
    function handleNext(){
        if(container.current && container.current.children.length > 0){
            //obteniendo primer elemento del container
            const firstElement = container.current.children[0];
            //transicion para el container
            container.current.style.transition = `1000ms ease-out all`;
            const tamañoImg = container.current.children[0].offsetWidth;
            //movimiento
            container.current.style.transform = `translateX(-${tamañoImg}px)`;
            
            function transicion(){
                //se reinicia la posicion de la imagen
                container.current.style.transition = 'none';
                container.current.style.transform = `translateX(0)`;
                //tomo primer elemento y lo mando al final
                container.current.appendChild(firstElement)
                container.current.removeEventListener('transitionend', transicion);
            }
            container.current.addEventListener('transitionend', transicion)
            
        }
    }

    function handlePrev(){
        if(container.current && container.current.children.length > 0){
           //obtenemos al ultimo elemento
           const indexLast = container.current.children.length-1
           const lastElement = container.current.children[indexLast];
           container.current.insertBefore(lastElement, container.current.firstChild);
           
           container.current.style.transition = 'none';
           const tamañoImg1 = container.current.children[0].offsetWidth;
           container.current.style.transform = `translateX(-${tamañoImg1}px)`;

           setTimeout(()=>{
             container.current.style.transition = '1000ms ease-out all';
             container.current.style.transform = `translateX(0)`;
           }, 100)
        }
    }

    useEffect(()=>{
        intervalContainer.current = setInterval(()=>{
            handleNext();
        }, 5000);
        container.current.addEventListener('mouseenter', () =>{
            clearInterval(intervalContainer.current);
        })
        container.current.addEventListener('mouseleave', () =>{
            intervalContainer.current = setInterval(()=>{
                handleNext();
            }, 5000);
        })
    }, [])    
    
    
    
    

    return(
        <div>
            <div class="container-slider" >
                <div class="slider" id="slider" ref={container}>
                    <div class="slider_section">
                        <img src={img1} alt="" class="slider_img"/>
                        <div class="text-section"><p>Cultiva en Casa!</p></div>
                    </div>
                    <div class="slider_section">
                        <img src={img2} alt="" class="slider_img"/>
                        <div class="text-section"><p>Compostemos Ya!</p></div>
                    </div>
                    <div class="slider_section">
                        <img src={img3} alt="" class="slider_img"/>
                        <div class="text-section"><p>Sos un gran generador de residuos Organicos?</p></div>
                    </div>
                </div>
                <div class="slider_btn slider_btn-left" id="btn-left" onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft}/></div>
                <div class="slider_btn slider_btn-right" id="btn-right" onClick={handleNext}><FontAwesomeIcon icon={faChevronRight}/></div>
            </div>
        </div>
    )

}