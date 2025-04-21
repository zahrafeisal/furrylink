import React from "react";

function Home() {
    return (
        <div className="home">
            <h1>Welcome to Furrylink!</h1>
            <h2>Adopt your dream furry friend</h2>
            {/* Log in & Sign up functionality in this component */}
            {/* log in button links to log in page */}
            <button>Log in</button>
            <p>Don't have an account?</p>
            <a href="link to sign up page">Sign up</a>
            {/* add links to components */}
        </div>
    );
}

export default Home;