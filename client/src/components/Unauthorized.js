import React from "react";
import { Link } from "react-router";

function Unauthorized() {
    return (
        <div>
            <h3>Please log in to access this feature</h3>
            <Link to={"/login"}>Log in</Link>
            <p>Don't have an account?</p>
            <Link to={"/users"}>Sign up</Link>
        </div>
    )
}

export default Unauthorized