import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <ul>
            <li>
                <NavLink exact to='/signup'>Sign Up</NavLink>
            </li>
            <li>
                <NavLink exact to='/facebook'>Facebook</NavLink>
            </li>
        </ul>
    )
}

export default Navbar
