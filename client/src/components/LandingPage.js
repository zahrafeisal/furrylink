import '../App.css';
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
            <h1 className='dancing-script-landingPageh1'>Furrylink</h1>
            <h5 className='tinos-regular'>Find your dream furry friend</h5>
            <p className='landingIcons'>
                <i className="fa-solid fa-paw"></i>
                <i className="fa-solid fa-dog"></i>
                <i className="fa-solid fa-cat"></i>
                <i className="fa-solid fa-feather"></i>
            </p>
            <button
              onClick={handleLogInClick}
              type="button"
              className="btn btn-primary"
            >
                Log in
            </button>
            <h5 
              className='tinos-regular' 
              style={{
                      paddingTop: "50px",
                      paddingBottom: "1px"
                    }}
            >
                Don't have an account?
                <span style={{paddingLeft: '5px'}}>
                    <Link
                      to={"/users"}
                      className="link-offset-2 link-offset-3-hover 
                                link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Sign up
                    </Link> 
                </span>
            </h5>
            {/* add link to home btw, but idk yet ill see */}
            {/* <Reviews /> */}
        </div>
    );
}

export default LandingPage;