import '../App.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from './Navbar';

function UserProfile({ user, setUpdatedUser, fetchUser }) {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const petsAdded = user.pets_added;
    const [userDetails, setUserDetails] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        telephone: user.telephone,
        organization_name: user.organization_name
    })

    useEffect(() => {  
        setUserDetails({  
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,  
            telephone: user.telephone,
            organization_name: user.organization_name
        });  
    }, [user]); // Sync userDetails whenever user updates  

    const isOrganization = !!userDetails.organization_name;
    
    function handleEdit() {
        if (user.id) {
            setEditMode(true);    // ensure other users can't edit ur profile
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
        fetch(`/user/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((updatedUser) => {
            console.log(updatedUser);
            setUpdatedUser(updatedUser);
            fetchUser();
            setEditMode(false);
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    function handlePetAdopted(id) {
        // remove from db
        fetch(`/pet/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Pet deleted successfully")
                return response.json();
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    function handleLogOut() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                navigate("/")
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <>
        <Navbar user={user} />
        <div className='homeHeader poppins-regular'>
            <h1>User Information</h1>
        </div>
        <div className='poppins-regular'>
            {/* Edit mode for all info, including organization_name if applicable */}
            {editMode ? (
                <div className="profileInputs">
                    {/* Show name or organization based on user's type */}
                    {!isOrganization ? (
                        <>
                            <label htmlFor="first_name">First name</label>
                            <input
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={userDetails.first_name || ""}
                              onChange={handleDeetsChange}
                              className="col-sm-3"
                            />

                            <label htmlFor="last_name">Last name</label>
                            <input
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={userDetails.last_name || ""}
                              onChange={handleDeetsChange}
                              className="col-sm-3"
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="organization_name">Organization Name</label>
                            <input
                              type="text"
                              id="organization_name"
                              name="organization_name"
                              value={userDetails.organization_name || ""}
                              onChange={handleDeetsChange}
                              className="col-sm-3"
                            />
                        </>
                    )}

                    {/* Common fields */}
                    <label htmlFor="telephone">Phone Number</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={userDetails.telephone || ""}
                      onChange={handleDeetsChange}
                      className="col-sm-3"
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userDetails.email || ""}
                      onChange={handleDeetsChange}
                      className="col-sm-3"
                    />

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
                </div>
            ) : (
                <div className="profileInfo">
                    {/* Show info depending on user type */}
                    {!isOrganization ? (
                        <>
                            <label htmlFor="first_name">First name</label>
                            <input
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={userDetails.first_name || ""}
                              onClick={handleEdit}
                              readOnly
                              className="col-sm-3"
                            />

                            <label htmlFor="last_name">Last name</label>
                            <input
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={userDetails.last_name || ""}
                              onClick={handleEdit}
                              readOnly
                              className="col-sm-3"
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="organization_name">Organization Name</label>
                            <input
                              type="text"
                              id="organization_name"
                              name="organization_name"
                              value={userDetails.organization_name || ""}
                              onClick={handleEdit}
                              readOnly
                              className="col-sm-3"
                            />
                        </>
                    )}

                    {/* Common info */}
                    <label htmlFor="telephone">Phone Number</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={userDetails.telephone || ""}
                      onClick={handleEdit}
                      readOnly
                      className="col-sm-3"
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userDetails.email || ""}
                      onClick={handleEdit}
                      readOnly
                      className="col-sm-3"
                    />
                </div>
            )}
            <div style={{
                textAlign: 'center',
                paddingTop: '25px'
            }}>
                <h1 className='poppins-regular'>Pets posted</h1>
            </div>
            <div className='homeCards'>
                {petsAdded.length === 0 ? (
                    <p 
                      style={{paddingTop: '10px', color: 'gray', fontSize: '20px', paddingLeft: '650px'}} 
                      className='tinos-regular'
                    >
                        <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                        No posts yet.
                    </p>
                ) : (
                    petsAdded.map((pet) => (
                    <div key={pet.id} className='homeCard' style={{width: '18rem'}}>
                        <div className='cardImg'>
                            <img src={"/uploads/" + pet.image_filename} alt={pet.breed} />
                        </div>
                        <div className='cardBody'> 
                            <h5><strong>{pet.breed}</strong></h5>  
                            <p>{pet.type}</p>  
                            <p><small>Ksh. {pet.price}</small></p>
                            <div style={{
                                        textAlign: 'center',
                                        paddingBottom: '10px'
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
            <div style={{
                paddingTop: '40px',
                textAlign: 'center',
                paddingBottom: '40px'
            }}>
                <button
                  onClick={handleLogOut}
                  type="button"
                  className="btn btn-danger"
                  style={{
                    width: '30%',
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                  }}
                >
                    Log out
                </button>
            </div>
        </div>
        </>
    )
}

export default UserProfile;