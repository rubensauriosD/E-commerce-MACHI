import "./App.css";
import { Route, Switch } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";
import Contacto from "./Pages/Contacto";
import Login from "./Pages/Login";

import NavBar from "./Components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/contact" component={Contacto} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
