// allows users to view account information
import React from "react";
import LandingPage from "./LandingPage";

function UserProfile() {
    // api functionality to fetch user info from app.db
    function handleLogOut() {
        // api functionality to logout endpoint
        return (
            <LandingPage />
        )
    }

    return (
        <div>
            {/* add click functionality to edit */}
            <h1>{/* store name of user */}</h1>
            <h2>{/* store email of user */}</h2>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default UserProfile;