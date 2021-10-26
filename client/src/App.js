import "./App.css";
import { Route } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";

import PrimarySearchAppBar from "./Components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={PrimarySearchAppBar} />
        <Route exact path="/" component={MainPage} />
        <h3>Front Funcionando</h3>
      </Router>
    </div>
  );
}

export default App;
