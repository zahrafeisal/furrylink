// WORKING!

// allows users to view account information, former applications, pets put up for adoption
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UserProfile({ user, currentUserID, setUpdatedUser, fetchUser }) {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: user.email,
        telephone: user.telephone
    })

    useEffect(() => {  
        setUserDetails({  
            email: user.email,  
            telephone: user.telephone  
        });  
    }, [user]); // Sync userDetails whenever user updates  
    
    let petsAdded = user.pets_added;
    let applications = user.applications;


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

    function handlePetClick(id) {
        navigate(`/pet/${id}`);    // navigate to pet component, useLocation needed
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
                return response.json();
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    function handleApplicationClick(id) {
        navigate(`/application/${id}`)    // navigate to AppDeets component, useLocation needed, to view individual components
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

    function handleStatusChange(applicationId, newStatus) {  
        fetch(`/application/${applicationId}`, {  
          method: 'PATCH',  
          headers: {  
            'Content-Type': 'application/json'  
          },  
          body: JSON.stringify({ status: newStatus })  
        })  
        .then(res => res.json())  
        .then(updatedApplication => {  
          // update state or refetch applications  
          // e.g., setApplications(prev => prev.map(app => app.id === updatedApplication.id ? updatedApplication : app))  
        });  
    }  

    return (
        <div>
            <h1>{`Hello, ${userDetails.email}`}</h1>
            {/* add click functionality to edit, dynamically turn p's to inputs */}
            {editMode ? (
                <>
                  <input 
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleDeetsChange}
                  />
                   <button onClick={handleDeetsSave}>Save</button>  
                   <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
            ) : (
                <>
                  <p onClick={handleEdit}>{userDetails.email}</p>
                </>
            )}
            {/* for each loop, create cards for each pet added by user, if any, clickable */}
            {/* hv a delete button */}
            <div>
                {petsAdded && petsAdded.map((pet) => (
                    <div key={pet.id}>
                        <p>{}</p>
                        <button onClick={() => handlePetClick(pet.id)}>View more</button>
                        <button onClick={() => handlePetAdopted(pet.id)}>Adopted</button>
                    </div>
                ))}
            </div>
            {/* for each loop, display in list form applications made and status, if any */}
            {applications && applications.map((app) => (
                <div key={app.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                    {/* show applicant info */}
                    <p>Name: {app.user.first_name} {app.user.last_name}</p>  
                    <p>Description: {app.description}</p>  
                    <p>Status: {app.status}</p>  
                    {/* Show buttons only if current user owns the pet */}  
                    {app.pet.user_id === currentUserID && (  
                        <>  
                        {app.status !== 'Approved' && (  
                            <button onClick={() => handleStatusChange(app.id, 'Approved')}>  
                              Approve  
                            </button>  
                        )}  
                        {app.status !== 'Rejected' && (  
                            <button onClick={() => handleStatusChange(app.id, 'Rejected')}>  
                              Reject  
                            </button>  
                        )}  
                        </>  
                    )}  
                </div>  
            ))}
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default UserProfile;