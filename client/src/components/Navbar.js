// have a navbar for userprofile, reviews
// Include in Home, Pets, Review, UserProfile, AdoptionApplication, 
// display name/email on the left, then the rest on the right

import React from "react";
import { NavLink } from "react-router-dom"
import Home from "./Home";

function Navbar() {

    return (
        <nav className="navbar">
            <NavLink to="">Home</NavLink>      
            <NavLink to="">Profile</NavLink>      {/* link to UserProfile */}
            <NavLink to="">Settings</NavLink>      {/* link to Settings */}
            <NavLink to="">Reviews</NavLink>      {/* link to Review */}
        </nav>
    )
}

export default Navbar;