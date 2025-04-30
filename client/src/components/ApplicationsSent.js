import React from 'react'
import { useNavigate } from 'react-router'

function ApplicationsSent({ currentUser }) {
    const navigate = useNavigate()
    
    // Access applications directly from user
    const sentApplications = currentUser.applications || []

    function handleApplicationClick(app) {
        navigate(`/sent-application/${app.id}`, {
            state: { app }
        })
    }

    return (
        <div>
            <h2>Applications You've Sent</h2>
            {sentApplications.length === 0 ? (
                <p>You haven't sent any applications yet.</p>
            ) : (
                sentApplications.map(app => (
                    <div
                      key={app.id}
                      style={{
                        border: '1px solid black',
                        margin: '10px',
                        padding: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleApplicationClick(app)}
                    >
                        <p>Pet: {app.pet.breed} ({app.pet.type})</p>
                        <p>Your Status: {app.status}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default ApplicationsSent