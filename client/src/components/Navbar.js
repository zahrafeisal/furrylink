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
                    <h4 className="dancing-script-landingPageh1">Furrylink</h4>
                    <i className="fa-solid fa-paw"></i>
                </div>
                <div className="navLinks">
                    <NavLink to={"/pets"}>
                        <i className="fa-solid fa-plus" style={{color: "black"}}></i>
                    </NavLink>    {/* link to AddPet */}
                    <NavLink to={"/home"}>
                        <i className="fa-solid fa-house" style={{color: "black"}}></i>
                    </NavLink>      {/* link to Home */}
                    <NavLink to={`/user/${user.id}`}>
                        <i className="fa-solid fa-user" style={{color: "black"}}></i>
                    </NavLink>      {/* link to UserProfile */}
                    <NavLink to={"/reviews"}>
                        <i className="fa-solid fa-comments" style={{color: "black"}}></i>
                    </NavLink>      {/* link to Review */}
                    <NavLink to={"/pet-applications"}>
                        <i className="fa-solid fa-inbox" style={{color: "black"}}></i>
                    </NavLink>  {/* link to Rcvd Apps */}
                    <NavLink to={"/sent-applications"}>
                        <i className="fa-solid fa-paper-plane"style={{color: "black"}}></i>
                    </NavLink>  {/* link to Sent Apps */}
                </div>
            </nav>
        )
    }
}

export default Navbar;