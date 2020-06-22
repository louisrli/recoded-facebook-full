import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./SignUp";
import Facebook from "./Facebook";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from './Navbar'
function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={"/signup"} component={SignUp} />
          <Route exact path={"/facebook"} component={Facebook} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
