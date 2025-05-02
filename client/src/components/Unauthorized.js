import React from "react";
import { Link } from "react-router";

function Unauthorized() {
    return (
        <div style={{
            marginTop: "200px",
            textAlign: 'center'
        }}>
            <i className="fa-solid fa-user-lock" style={{
                    fontSize: "2.5rem",
                    paddingBottom: '20px'
                }}></i>
            <h3 className='dancing-script-landingPageh1' style={{paddingBottom: "20px"}}>Please log in to access this feature</h3>
            <Link to={"/login"}className="link-offset-2 link-offset-3-hover 
                link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                style={{
                    fontSize: "1.5rem"
                }}
            >Log in</Link>
            <h5 className='tinos-regular' style={{
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
    )
}

export default Unauthorized