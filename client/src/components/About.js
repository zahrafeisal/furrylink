import React from "react";
import Reviews from "./Reviews";
import LandingNavbar from "./LandingNavbar";

function About() {
    return (
        <>
        <LandingNavbar />
        <div className="poppins-regular" style={{marginTop: '120px'}} >
            <div className='aboutHeaders' style={{marginBottom: '50px' }}>
                <h4 style={{ display: 'inline-block', margin: 0 }}>Connecting Pets with their Dream Owners</h4>
                <div style={{
                    margin: '8px auto 0',
                    width: '450px',
                    borderBottom: '3px solid maroon'
                }}></div>
            </div>
            <div style={{textAlign: 'center'}}>
                <p>Furrylink aims to provide a conducive environment for all pets up for adoption by providing<br />
                    an expressive and user-friendly platform that connects current pet custodians to the< br />
                    prospective pet owners owners.
                </p>
                <div style={{width: '20rem', height: '18rem',}}>
                    <img 
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '30px 60px',
                        marginLeft: '600px'
                      }} 
                      src="https://media.zenfs.com/en/kswb_articles_601/4c4a49d7d46240d12e1304cc9f9bb28a" 
                      alt="Application form" />
                </div>
            </div>
            <div style={{
                    display: "flex", 
                    justifyContent: 'space-between',
                    marginTop: '50px',
                    marginLeft: '50px',
                    marginRight: '50px'
                    }}>
                <div>
                    <div className='aboutHeaders' style={{marginBottom: '50px' }}>
                        <h4 style={{ display: 'inline-block', margin: 0 }}>Streamlining the Adoption Process</h4>
                        <div style={{
                            margin: '8px auto 0',
                            width: '370px',
                            borderBottom: '3px solid maroon'
                        }}></div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <p>In just one click, prospective pet owners can feel in an adoption application<br />
                            form with relevant details at their own convenience. Information is readily<br />
                            available and easily accessible for the best adoption experience.
                        </p>
                        <div style={{width: '20rem', height: '18rem',}}>
                            <img 
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '30px 60px',
                                marginLeft: '100px'
                              }} 
                              src="https://www.totaljobs.com/advice/wp-content/uploads/how-to-fill-in-an-application-form-compressor.jpg" 
                              alt="Application form" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='aboutHeaders' style={{marginBottom: '50px' }}>
                        <h4 style={{ display: 'inline-block', margin: 0 }}>User-friendly Interface</h4>
                        <div style={{
                            margin: '8px auto 0',
                            width: '220px',
                            borderBottom: '3px solid maroon'
                        }}></div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <p>For the ultimale user experience the application is best suited to all kinds of<br />
                            users prodiving ease of functionality and navigation. Furrylink's development<br />
                            has been tailored to provide intuitive pages and simplified interfaces.
                        </p>
                        <div style={{width: '20rem', height: '18rem',}}>
                            <img 
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '30px 60px',
                                marginLeft: '150px'
                              }} 
                              src="https://itbrief.com.au/uploads/story/2023/03/21/GettyImages-1408596915.webp" 
                              alt="Application form" />
                        </div>
                    </div>
                </div>
            </div>
            <Reviews />
        </div>
        <div className='footer poppins-regular'>
            <div>
                <h4>Feel free to contact us</h4>
                <div>
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '80px',
                        marginTop: '30px',
                        marginBottom: '40px'
                    }}>
                        <li>Email</li>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                        <li>Telephone</li>
                    </ul>
                </div>
            </div>
            <small><i style={{paddingRight: '5px'}} className="fa-regular fa-copyright"></i>zahrafeisal3@gmail.com. All rights reserved.</small>
        </div>
        </>
    )
}

export default About;