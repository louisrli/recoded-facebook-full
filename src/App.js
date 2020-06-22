import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import SignUpPage from './SignUp';
import FacebookPage from './Facebook';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./Navbar";

function App() {
  return (
    <Container>
      <Router>
        <Navbar/>
        <Switch>
          <Route path={'/helloworld'} component={SignUpPage} />
          <Route path={'/facebook'} exact component={FacebookPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
