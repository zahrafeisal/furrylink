import React from "react";
import { Link } from "react-router";
import LandingNavbar from "./LandingNavbar";

function Unauthorized() {
    return (
        <>
        <LandingNavbar />
        <div style={{
            marginTop: "200px",
            textAlign: 'center'
        }}>
            <div className='signUpHeader'>
                <h2 className='dancing-script-landingPageh1'>Furrylink</h2> 
            </div>  
            <i className="fa-solid fa-user-lock" style={{
                    fontSize: "2.5rem",
                    paddingBottom: '20px'
                }}></i>
            <h3 className='poppins-regular' style={{paddingBottom: "20px"}}>Please log in to access this feature</h3>
            <Link to={"/login"}className="link-offset-2 link-offset-3-hover 
                link-underline link-underline-opacity-0 link-underline-opacity-75-hover btn btn-primary poppins-regular"
                style={{
                    width: '250px'
                }}
            >Log in {' '}<i className="fa-solid fa-arrow-right"></i></Link>
            <h5 className='poppins-regular' style={{
                            paddingTop: "30px"
                        }}>
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
        </div>
        </>
    )
}

export default Unauthorized