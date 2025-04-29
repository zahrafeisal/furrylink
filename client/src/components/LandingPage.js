// WORKING!

import React from "react";
import { Link, useNavigate } from "react-router";
import Reviews from "./Reviews";

function LandingPage() {

    const navigate = useNavigate();

    function handleLogInClick() {
        navigate('/login'); // navigate to log in form
    }
    
    return (
        <div className="home">
            <h1>Welcome to Furrylink!</h1>
            <h2>Adopt your dream furry friend</h2>
            {/* Log in & Sign up functionality in this component */}
            {/* log in button links to log in page */}
            <button onClick={handleLogInClick}>Log in</button>
            <p>Don't have an account?</p>
            <Link to={"/users"}>Sign up</Link>
            {/* add links to components */}
            <Reviews />
        </div>
    );
}

export default LandingPage;