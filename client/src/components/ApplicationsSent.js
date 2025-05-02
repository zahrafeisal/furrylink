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
        <div className='addPet tinos-regular'>
            <div className='signUpHeader'>
                <h2 className='tinos-regular'><strong>Sent Applications</strong></h2>  
            </div>  
            {sentApplications.length === 0 ? (
                <p 
                  style={{paddingTop: '150px', color: 'gray', fontSize: '20px', textAlign: 'center'}} 
                  className='tinos-regular'
                >
                    <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                    You haven't sent any applications.
                </p>
            ) : (
                sentApplications.map(app => (
                    <div
                      key={app.id}
                      className='card'
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
                            To: 
                            <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                            {app.pet.user.email}
                        </div>
                        <div className='card-body'>
                            <h5 className='card-title'><strong>{app.pet.breed} ({app.pet.type})</strong></h5>
                            <p className='card-text'><small>{app.status}</small></p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ApplicationsSent