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
        <div>
            <h2>Applications Received for Your Pets</h2>
            {appsReceived.length === 0 ? (
                <p>No applications received.</p>
            ) : (
                appsReceived.map(app => (
                    <div key={app.id}
                      style={{
                        border: '1px solid black',
                        margin: '10px',
                        padding: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleApplicationClick(app)}
                    >
                        <p>Pet: {app.pet.breed} ({app.pet.type})</p>
                        <p>
                            <strong>Received from:</strong>
                            {app.user?.animal_shelter
                                ? `${app.user.organization_name ?? 'N/A'}`
                                : `${app.user?.first_name ?? ''} ${app.user?.last_name ?? ''}`.trim()
                            }
                        </p>
                        <p>Status: {app.status}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default ApplicationsReceived