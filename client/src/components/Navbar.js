import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css'

function Navbar({ user }) {
    if (user) {
        return (
            <nav className="navbar poppins-regular">
                <div className="navLogo">
                    <h4 className="dancing-script-landingPageh1">Furrylink</h4>
                    <i className="fa-solid fa-paw"></i>
                </div>
                <div className="navLinks">
                    <NavLink to={"/home"} className={'navLink link-offset-2 link-underline link-underline-opacity-0'}>
                        <i className="fa-solid fa-house" style={{color: "black"}}></i>
                        <small>Home</small>
                    </NavLink>  
                    <NavLink to={"/pets"} className={'navLink link-offset-2 link-underline link-underline-opacity-0'}>
                        <i className="fa-regular fa-square-plus" style={{color: "black"}}></i>
                        <small>Post</small>
                    </NavLink> 
                    <NavLink to={"/pet-applications"} className={'navLink link-offset-2 link-underline link-underline-opacity-0'}>
                        <i className="fa-solid fa-inbox" style={{color: "black"}}></i>
                        <small>Inbox</small>
                    </NavLink>
                    <NavLink to={"/sent-applications"} className={'navLink link-offset-2 link-underline link-underline-opacity-0'}>
                        <i className="fa-solid fa-paper-plane"style={{color: "black"}}></i>
                        <small>Sent</small>
                    </NavLink> 
                </div>
                <div className="navLink2">
                    <NavLink to={`/user/${user.id}`}>
                        <i className="fa-regular fa-circle-user" style={{color: "black"}}></i>
                    </NavLink>     
                </div>
            </nav>
        )
    }
}

export default Navbar;