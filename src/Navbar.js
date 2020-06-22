import React from 'react';
import { Link } from 'react-router-dom';
import SignUpPage from './SignUp';
import FacebookPage from './Facebook';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function Navbar() {
    return (
        <Container>
         
                    <Link to={'/helloworld'}>Sign  Up</Link>
                    <Link to={'/facebook'} >Home</Link>

              
        </Container>
    );
}

export default Navbar;
