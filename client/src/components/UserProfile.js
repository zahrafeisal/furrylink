// allows users to view account information, former applications, pets put up for adoption
import React from "react";

function UserProfile({ user }) {
    let userID = user.id
    // api functionality to fetch user info from app.db

    return (
        <div>
            {/* add click functionality to edit */}
            <h1>{/* store name of user */}</h1>
            <h2>{/* store email of user */}</h2>
        </div>
    )
}

export default UserProfile;