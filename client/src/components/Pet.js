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
        <>
        <div className="appDetails tinos-regular">
            <h2 className='dancing-script-landingPageh1'>Pet Details</h2>
            <div className="card"
              style={{
                border: '1px solid black',
                margin: '10px',
                padding: '10px',
                marginLeft: '250px',
                marginRight: '250px',
              }}
            >
                <div className="card-header">
                    <i className="fa-solid fa-user" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                    Current Custodian: {' '}
                    {pet?.user?.email} {' '}
                    ({pet.user?.animal_shelter
                        ? `${pet.user.organization_name ?? 'N/A'}`
                        : `${pet.user?.first_name ?? ''} ${pet.user?.last_name ?? ''}`.trim()
                    })
                </div>
                <div className="card-body">
                    <div className='appImg'>
                        <img src={pet.image_filename} alt={pet.breed} />
                    </div>
                    <h3 style={{paddingBottom: '10px', paddingTop: '10px'}} className='card-title'><strong>{pet?.breed ?? 'N/A'} ({pet?.type ?? 'N/A'})</strong></h3>
                    <p className="card-text"><strong>Age: </strong>{pet.age} years</p>
                    <p className="card-text">
                        <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                        Interested? Click the button below to apply for adoption
                    </p>
                    <button type="button" className='btn btn-primary' onClick={() => handleAdoptClick(pet)}>Apply for adoption</button> 
                </div>
                <div className="card-footer">
                    <strong>Price:</strong> Ksh. {pet.price}
                </div>
            </div>
        </div>
        </>
    )
}

export default Pet;