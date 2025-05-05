import React from "react";
import { NavLink } from "react-router";

function LandingNavbar() {
    return (
        <nav className='poppins-regular landingNav'>
            <div className='landingNavLogo'>
                <i className="fa-solid fa-paw"></i>   
            </div>
            <div className='landingNavlinks'>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/about"}>About</NavLink>
                <NavLink to={"/support"}>Support</NavLink>
            </div>
            <div className='landingNavlinks2'>
                <NavLink className={'btn btn-primary'} to={"/login"}>Log in</NavLink>
                <NavLink className={'btn signUpbtn'} style={{
                    
                }} to={"/users"}>Sign Up</NavLink>
            </div>
        </nav>
    )
}

export default LandingNavbar
