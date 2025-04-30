// WORKING!

// displays individual pet info clicked for view from Home, allow users to apply for adoption

import React from "react";
import { useLocation, useNavigate } from "react-router";

function Pet() {
    const navigate = useNavigate();
    const location = useLocation();
    const pet = location.state?.pet;    // access data from state in pet card when navigated from home

    function handleAdoptClick(pet) {
        navigate('/application', {
            state: { pet }
        })
    }

    return (
        <div>
            <p>{pet.breed}</p>
            {/* navigate to application form */}
            <button onClick={() => handleAdoptClick(pet)}>Apply for adoption</button> 
        </div>
    )
}

export default Pet;