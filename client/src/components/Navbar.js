// WORKING!

// have a navbar for userprofile, reviews
// display name/email on the left, then the rest on the right

import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css'

function Navbar({ user }) {

    if (user) {
        return (
            <nav className="navbar">
                <div className="navLogo">
                    {user.email}
                </div>
                <div className="navLinks">
                    <NavLink to={"/pets"}>Add Pet</NavLink>    {/* link to AddPet */}
                    <NavLink to={"/home"}>Home</NavLink>      {/* link to Home */}
                    <NavLink to={`/user/${user.id}`}>Profile</NavLink>      {/* link to UserProfile */}
                    <NavLink to={"/reviews"}>Reviews</NavLink>      {/* link to Review */}
                </div>
            </nav>
        )
    }
}

export default Navbar;