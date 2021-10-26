import "./App.css";
import { Route } from "react-router";
import MainPage from "./Pages/MainPage";
import { HashRouter as Router } from "react-router-dom";

import NavBar from "./Components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={MainPage} />
        <h3>Front Funcionando</h3>
      </Router>
    </div>
  );
}

export default App;
