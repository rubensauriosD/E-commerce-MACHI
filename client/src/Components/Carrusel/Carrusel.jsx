import "./CarruselStyle.css"
import img1 from "./img/img1.jpg"
import img2 from "./img/img2.jpg"
import img3 from "./img/img3.jpg"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export default function Carrusel(){
   
    

    return(
        <div>
            <div class="container-slider">
                <div class="slider" id="slider">
                    <div class="slider_section">
                        <img src={img1} alt="" class="slider_img"/>
                    </div>
                    <div class="slider_section">
                        <img src={img2} alt="" class="slider_img"/>
                    </div>
                    <div class="slider_section">
                        <img src={img3} alt="" class="slider_img"/>
                    </div>
                </div>
                <div class="slider_btn slider_btn-left" id="btn-left"><FontAwesomeIcon icon={faChevronLeft}/></div>
                <div class="slider_btn slider_btn-right" id="btn-right"><FontAwesomeIcon icon={faChevronRight}/></div>
            </div>
        </div>
    )

}