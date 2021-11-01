import "./App.css";
import { Route, Switch } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";
import ContactPage from "./Pages/ContactPage";
import Login from "./Pages/Login";
import Tienda from "./Pages/Tienda";
import NavBar from "./Components/NavBar";
import Admin from "./Pages/Admin"

import DetalleProducto from "./Pages/DetalleProducto";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tienda/:nombreCategoria" render={({match})=><Tienda props={match.params.nombreCategoria}/>}/> 
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/producto/:idProducto" render={({match})=><DetalleProducto props={match.params.idProducto}/>}/>
        </Switch> 
         <Route exact path="/admin" component={Admin} /> 
      </Router>
    </div>
  );
}

export default App;
