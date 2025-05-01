// WORKING!

import React from "react";
import { Link, useNavigate } from "react-router";
import Reviews from "./Reviews";

function LandingPage() {

    const navigate = useNavigate();

    function handleLogInClick() {
        navigate('/login');   // to log in component
    }
    
    return (
        <div className="landingPage">
            <h1>Welcome to Furrylink!</h1>
            <h2>Adopt your dream furry friend</h2>
            <button onClick={handleLogInClick}>Log in</button>
            <p>Don't have an account?</p>
            <Link to={"/users"}>Sign up</Link>
            {/* add link to home btw */}
            <Reviews />
        </div>
    );
}

export default LandingPage;