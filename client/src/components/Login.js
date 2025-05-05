import React from "react";
import LoginForm from "./LoginForm";

function Login({ onLogin }) {
    return (
        <div className="loginPage">
            <div className="loginHeader">
                <h2 className='dancing-script-landingPageh1'>Furrylink</h2> 
            </div>
            <div style={{
                paddingLeft: '150px'
            }}>
                <LoginForm onLogin={onLogin} />
            </div>
        </div>
    )
}

export default Login;