import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function ApplicationsReceived({ user }) {
    const navigate = useNavigate();
    const [allApplications, setAllApplications] = useState([]);

    const fetchApps = () => {
        fetch("/applications")
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("No applications found")
            }
        })
        .then((applications) => {
            setAllApplications(applications)
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    useEffect(() => {fetchApps()}, [])

    // Get IDs of user's posted pets
    const myPetIds = user.pets_added ? user.pets_added.map(pet => pet.id) : [];
    const appsReceived = allApplications.filter(app => myPetIds.includes(app.pet_id))

    function handleApplicationClick(app) {
        navigate(`/pet-application/${app.id}`, {
            state: { app }
        })
    }

    return (
        <div className='addPet'>
            <div className='signUpHeader'>
                <h2 className='tinos-regular'><strong>Received Applications</strong></h2>  
            </div>  
            {appsReceived.length === 0 ? (
                <p 
                  style={{paddingTop: '150px', color: 'gray', fontSize: '20px', textAlign: 'center'}} 
                  className='tinos-regular'
                >
                    <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                    You haven't received any applications.
                </p>
            ) : (
                appsReceived.map(app => (
                    <div key={app.id} className='card'
                      style={{
                        border: '1px solid black',
                        margin: '10px',
                        padding: '10px',
                        cursor: 'pointer',
                        marginLeft: '360px',
                        marginRight: '360px'
                      }}
                      onClick={() => handleApplicationClick(app)}
                    >
                        <div className='card-header'>
                            From: 
                            <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                            {app.user.email}
                        </div>
                        <div className='card-body'>
                            <h5 className='card-title'>{app.pet.breed} ({app.pet.type})</h5>
                            <p className='card-text'><small>{app.status}</small></p>
                        </div>

                    </div>
                ))
            )}
        </div>
    )
}

export default ApplicationsReceived