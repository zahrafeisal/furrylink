import '../App.css';
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import LandingNavbar from './LandingNavbar';

function LandingPage() {
    return (
        <>
        <LandingNavbar />
        <div className="landingPage" style={{position: 'relative'}}>
            <h1 className='dancing-script-landingPageh1'>Furrylink</h1>
            <p className='poppins-regular' style={{paddingTop: '.7rem'}}>Bridging the gap between you and your dream pet</p>
            <div style={{
                position: 'absolute',
                left: '800px',
                top: '10%'
            }}>
                <LoginForm />
            </div>
        </div>
        <div className='landingGallery'>
            <img style={{borderRadius: '30px 60px'}} src='https://www.polypet.com.sg/cdn/shop/articles/Pomeranian-Colors_700x.jpg?v=1644918555' alt='Pomeranian Dogs'/>
            <img style={{borderRadius: '60px 30px'}} src='https://image.petmd.com/files/inline-images/silver-persian-cat.jpg?VersionId=lA9jJUgugdFTclEJMdH4cC7LQuNgmacR' alt='Persian Cat'/>
            <img style={{borderRadius: '10px 60px 30px'}} src='https://media.istockphoto.com/id/1347214341/photo/young-woman-with-adorable-rabbit-on-floor-indoors-lovely-pet.jpg?s=612x612&w=0&k=20&c=PBf2GMTfBwdznJaXNkH6QL8LYiXsJn2NhfxX5qkTzDU=' alt='Rabbit'/>
        </div>
        <div className='aboutSections poppins-regular'>
            <div style={{
                textAlign: 'center',
                paddingBottom: '40px'
            }}>
                <h3>We have our pets' best interests at heart</h3>
                <p>And yours too! ;)</p>
            </div>
            <div className='aboutSection'>
                <img src='https://b1157417.smushcdn.com/1157417/wp-content/uploads/family-outdoors-backyard-playing-dog-offleash-11-825x549.jpg?lossy=1&strip=1&webp=0' alt='Dog' />
                <div
                  style={{
                    paddingLeft: '25px',
                    paddingTop: '35px', 
                  }}
                >
                    <h5 style={{color: 'maroon'}}>Find a pet their new loving home</h5>
                    <p>Give pets a chance to belong to a loving home by <br />
                        signing them up for adoption.
                    </p>
                </div>
            </div>
            <div style={{
                    marginLeft: '550px'
                }} className='aboutSection'>
                <img src='https://www.jadpo.co.uk/cdn-cgi/image/fit=cover,format=auto,width=768,height=750/https://images.ctfassets.net/4cuokmrwdiqv/6JL03TiD3IqxvvPacemOqs/748427564b0778b918bef7942a4b5b97/hub-hero-image-desktop.jpg' alt='Dog' />
                <div
                  style={{
                    paddingLeft: '25px',
                    paddingTop: '35px', 
                  }}
                >
                    <h5 style={{color: 'maroon'}}>Adopt your dream pet</h5>
                    <p>Connect with users who have posted your <br />
                        desired pets up for adoption by sending <br />
                        an application form.
                    </p>
                </div>
            </div>
            <div className='aboutSection'>
                <img src='https://petsmartcharities.ca/sites/default/files/2024-03/pci-web_find-a-pet-hero_2024_CA.webp' alt='Cat'/>
                <div
                  style={{
                    paddingLeft: '25px',
                    paddingTop: '35px', 
                  }}
                >
                    <h5 style={{color: 'maroon'}}>Manage pet adoption applications</h5>
                    <p>Approve or reject adoption applications received on pets <br />
                        posted according to your desired criteria.
                    </p>
                </div>
            </div>
            <div style={{position: 'relative'}}>
                <div 
                  style={{
                      position: 'absolute',
                      top: '60%',
                      display: 'flex'
                    }}
                >
                    <Link
                      style={{
                        width: '200px',
                        marginRight: '20px',
                      }}
                      className={'btn signUpbtn'}
                      to={"/about"}
                    >
                        Learn More
                    </Link>
                    <Link
                      style={{
                        width: '200px'
                      }} 
                      className={'btn btn-primary'}
                      to={'/users'}
                    >
                        Get started
                    </Link>
                </div>
                <div 
                  style={{
                    marginLeft: '550px'
                  }}
                  className='aboutSection'
                >
                    <img src='https://www.nvadg.org/wp-content/uploads/2020/11/nvadg_home_intro-min.jpg' alt='Rescue' />
                    <div
                      style={{
                        paddingLeft: '25px',
                        paddingTop: '35px', 
                      }}
                    >
                        <h5 style={{color: 'maroon'}}>Partnerships with animal rescues and shelters</h5>
                        <p>Conveniently apply for adoption of pets available at <br />
                            registered animal shelters and rescues of your choice.
                        </p>
                    </div>
                </div>
            </div>
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
            <small><i style={{paddingRight: '1px'}} className="fa-regular fa-copyright"></i>2025 Furrylink. All rights reserved.</small>
        </div>
        </>
    );
}

export default LandingPage;