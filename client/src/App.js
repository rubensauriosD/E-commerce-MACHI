import "./App.css";
import { Route, Switch } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";
import Contacto from "./Pages/Contacto";
import Login from "./Pages/Login";
import Tienda from "./Pages/Tienda";
import NavBar from "./Components/NavBar";
import DetalleProducto from "./Pages/DetalleProducto";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/contact" component={Contacto} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tienda/:nombreCategoria" render={({match})=><Tienda props={match.params.nombreCategoria}/>}/> 
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/producto/:idProducto" render={({match})=><DetalleProducto props={match.params.idProducto}/>}/>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
