import "./App.css"; 
import { Route, Switch } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";
import ContactPage from "./Pages/ContactPage";
import Login from "./Pages/Login";
import Tienda from "./Pages/Tienda";
import NavBar from "./Components/NavBar";
import Admin from "./Pages/Admin";
import DetalleProducto from "./Pages/DetalleProducto";
import SuccesLogin from "./ContenedoresTemporales/ContenedorDeFace";
import Cart from "./Pages/Cart";
import MercadoPago from "./Components/MercadoPago/MercadoPago"
import Nosotros from "./Pages/Nosotros";
import Servicios from "./Pages/Servicios";
import PieDePagina from "./Components/PieDePagina/PieDePagina";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route exact path="/" component={MainPage}  />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/tienda/:nombreCategoria"
            render={({ match }) => (
              <Tienda props={match.params.nombreCategoria} />
            )}
          />
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/nosotros" component={Nosotros} />
          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/producto/:idProducto" render={({match})=><DetalleProducto props={match.params.idProducto}/>}/>
        </Switch> 
          <Route path="/successLogin" component={SuccesLogin}/> {/*guia para ruben y vero*/}
          <Route exact path="/admin" component={Admin} /> 
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={MercadoPago} />
          <Route exact path="/PieDePagina" component={PieDePagina} />
      </Router>
    </div>
  );
}

export default App;
