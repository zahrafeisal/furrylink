// WORKING!

// allows users to view account information

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UserProfile({ user, setUpdatedUser, fetchUser }) {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const petsAdded = user.pets_added;
    const [userDetails, setUserDetails] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        telephone: user.telephone
    })

    useEffect(() => {  
        setUserDetails({  
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,  
            telephone: user.telephone  
        });  
    }, [user]); // Sync userDetails whenever user updates  
    
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
        navigate(`/pet/${id}`);    // navigate to pet component or edit pet info but idk yet tho i'll see
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
        <div>
            <h1>{`Hello, ${userDetails.email}`}</h1>
            {/* add click functionality to edit, dynamically turn p's to inputs */}
            {editMode ? (
                <>
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userDetails.firstName}
                    readOnly
                  />
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userDetails.lastName}
                    readOnly
                  />
                  <label htmlFor="telephone">Phone Number</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={userDetails.telephone}
                    onChange={handleDeetsChange}
                  />
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email"
                    id="email"
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
            <div>
                {petsAdded && petsAdded.map((pet) => (
                    <div key={pet.id}>
                        <img src={"/uploads/" + pet.image_filename} alt={pet.breed} />
                        <p>{pet.type}</p>
                        <p>{pet.breed}</p>
                        <button onClick={() => handlePetClick(pet.id)}>View more</button>
                        <button onClick={() => handlePetAdopted(pet.id)}>Adopted</button>
                    </div>
                ))}
            </div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default UserProfile;