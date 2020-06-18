import React from 'react'
import { NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <ul>
            <li><NavLink exact to='/helloworld'>SignUpPage</NavLink></li>
            <li><NavLink to='/facebook'>facebookPage</NavLink></li>
        </ul>
    )
}

export default Navbar
