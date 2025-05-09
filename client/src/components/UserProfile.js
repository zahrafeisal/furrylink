import '../App.css'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from './Navbar';
import { UserContext } from './UserContext';

function UserProfile({ fetchUser }) {
    const API_BASE = process.env.REACT_APP_API_URL;
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const petsAdded = currentUser.pets_added;
    const [userDetails, setUserDetails] = useState({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        telephone: currentUser.telephone,
        organization_name: currentUser.organization_name
    })

    useEffect(() => {  
        setUserDetails({  
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,  
            telephone: currentUser.telephone,
            organization_name: currentUser.organization_name
        });  
    }, [currentUser]); // Sync userDetails whenever user updates  

    const isOrganization = !!userDetails.organization_name;
    
    function handleEdit() {
        if (currentUser.id) {
            setEditMode(true);    // ensure other users can't edit ur profile, future profile search functionality
        }
    }

    function handleDeetsChange(e) {
        const { name, value } = e.target;
        setUserDetails((previousDeets) => ({
            ...previousDeets,
            [name]: value
        }));
    }

    function handleDeetsSave() {
        fetch(`${API_BASE}/user/${currentUser.id}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        .then((response) => {
            if (response.ok) {
                setErrorMessage(null);
                return response.json();
            } else if (response.status === 404) {
                setErrorMessage("User not found.")
            }
        })
        .then((updatedUser) => {
            console.log(updatedUser);
            setCurrentUser(updatedUser);
            fetchUser();
            setEditMode(false);
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }

    function handlePetAdopted(id) {
        fetch(`${API_BASE}/pet/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }

    function handleLogOut() {
        fetch(`${API_BASE}/logout`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then((response) => {
            if (response.ok) {
                navigate("/")
            }
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }

    return (
        <>
        <Navbar user={currentUser} />
        <nav className='logOutNav poppins-regular'>
            <div
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', cursor: 'pointer'
              }}
              onClick={handleLogOut}
            >
                <i className="fa-solid fa-right-from-bracket"></i>
                <small style={{marginTop: '2px', fontSize: '1rem'}}>Log out</small>
            </div>
        </nav>
        <div style={{textAlign: 'center', marginTop: '150px',}} className='poppins-regular'>
            <h2>Personal Profile</h2>
        </div>
        <div className='poppins-regular'>
            {/* Edit mode for all info, including organization_name if applicable */}
            {editMode ? (
                <div className="profileInfo">
                    {/* Show name or organization based on user's type */}
                    {!isOrganization ? (
                        <>
                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="first_name">First name</label>
                            </div>
                            <div>  
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={userDetails.first_name || ""}
                                    onChange={handleDeetsChange}
                                    size={50}
                                />
                            </div>
                        </div>

                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="last_name">Last name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={userDetails.last_name || ""}
                                    onChange={handleDeetsChange}
                                    size={50}
                                />
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="organization_name">Organization Name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="organization_name"
                                    name="organization_name"
                                    value={userDetails.organization_name || ""}
                                    onChange={handleDeetsChange}
                                    size={50}
                                />
                            </div>
                        </div> 
                        </>
                    )}

                    {/* Common fields */}
                    <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="telephone">Phone Number</label>
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    id="telephone"
                                    name="telephone"
                                    value={userDetails.telephone || ""}
                                    onChange={handleDeetsChange}
                                    size={50}
                                />
                            </div>
                    </div>

                    <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userDetails.email || ""}
                                    onChange={handleDeetsChange}
                                    size={50}
                                />
                            </div>
                    </div>

                    <div className='profileButtons'>
                        <button
                          onClick={handleDeetsSave}
                          type='button'
                          className='btn btn-primary'
                        >   
                            Save
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          type='button'
                          className='btn btn-secondary'
                        >
                            Cancel
                        </button>
                    </div>
                    {errorMessage && (
                        <div style={{ color: 'red', paddingTop: '10px', paddingBottom: '10px' }}>{errorMessage}</div>
                    )}
                </div>
            ) : (
                <div className="profileInfo">
                    {/* Show info depending on user type */}
                    {!isOrganization ? (
                        <>
                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="first_name">First name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={userDetails.first_name || ""}
                                    onClick={handleEdit}
                                    readOnly
                                    size={50}
                                />
                            </div>
                        </div>

                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="last_name">Last name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={userDetails.last_name || ""}
                                    onClick={handleEdit}
                                    readOnly
                                    size={50}
                                />
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className='profileInfoDiv'>
                            <div className='labelDiv'>
                                <label htmlFor="organization_name">Organization Name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="organization_name"
                                    name="organization_name"
                                    value={userDetails.organization_name || ""}
                                    onClick={handleEdit}
                                    readOnly
                                    size={50}
                                />
                            </div>
                        </div>
                        </>
                    )}

                    {/* Common info */}
                    <div className='profileInfoDiv'>
                        <div className='labelDiv'>
                            <label htmlFor="telephone">Phone Number</label>
                        </div>
                        <div>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={userDetails.telephone || ""}
                                onClick={handleEdit}
                                readOnly
                                size={50}
                            />
                        </div>
                    </div>

                    <div className='profileInfoDiv'>
                        <div className='labelDiv'>
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetails.email || ""}
                                onClick={handleEdit}
                                readOnly
                                size={50}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className='poppins-regular' style={{
                textAlign: 'center',
                paddingTop: '35px',
            }}>
                <h3>Pets posted</h3>
            </div>
            <div className='homeCards' style={{flexDirection: 'row', marginLeft: '20px'}} >
                {petsAdded.length === 0 ? (
                    <p 
                      style={{color: 'gray', fontSize: '20px', marginLeft: '44%'}} 
                      className='poppins-regular'
                    >
                        <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                        No posts yet.
                    </p>
                ) : (
                    petsAdded.map((pet) => (
                    <div key={pet.id} className='homeCard' style={{width: '40rem', height: '15rem'}}>
                        <div className='cardImg'>
                            <img src={`https://furrylink-backend.onrender.com/uploads/${pet.image_filename}`} alt={pet.breed} />
                        </div>
                        <div className='cardBody' style={{marginLeft: '10px'}}> 
                            <h6>{pet.breed} {pet.type}</h6>    
                            <p><strong>Age: </strong>{pet.age} yrs</p>
                            <p><strong>Price: </strong>Ksh. {pet.price}</p>
                            <div style={{
                                        textAlign: 'center',
                                        paddingBottom: '5px',
                                        paddingTop: '25px'
                                    }}>
                                <button 
                                    onClick={() => handlePetAdopted(pet.id)}
                                    className='btn btn-primary'
                                >
                                    Adopted
                                </button>
                            </div>
                        </div>
                    </div>
                )))}
            </div>
        </div>
        </>
    )
}

export default UserProfile;