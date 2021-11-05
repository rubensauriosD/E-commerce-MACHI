import "../Styles/Courses.css";
import { Link } from "react-router-dom";

const Courses= () =>{return(
    <div className="CoursesDiv">
        <div className="linksDivs">
            <Link  style ={{textDecoration:'none'}} className="CoursesLink" to="/linkCursos">
                <figure className="figCourses">
                    <figcaption>CAPACITACION Y CURSOS</figcaption>
                    <img className="imgCourses" src="https://www.debrown.com.ar/wp-content/uploads/2020/09/huerta-org%C3%A1nica-2020-1.jpg" alt="la futura imagen"/>
                </figure>  
            </Link>
        </div>

    </div>
    )
}

export default Courses