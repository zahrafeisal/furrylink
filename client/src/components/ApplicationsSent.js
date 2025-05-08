import React from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from './Navbar'

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
        <>
        <Navbar user={currentUser} />
        {!currentUser.animal_shelter ? (
            <nav className='logOutNav poppins-regular' style={{paddingLeft: '30px', paddingTop: '20px'}} >
                <Link to={'/sent-applications'} style={{width: '100px'}} className='btn btn-primary' >Sent</Link>
                <Link to={'/pet-applications'}style={{width: '100px', color: 'black'}} className='btn btn-outline-light'>Received</Link>
            </nav> 
        ) : null}
        <div className='addPet poppins-regular'>
            <div style={{
                textAlign: 'center',
                paddingTop: '30px',
                paddingBottom: '30px'
            }} className='poppins-regular'>
                <h2>Sent Applications</h2>  
            </div>  
            {sentApplications.length === 0 ? (
                <p 
                  style={{paddingTop: '150px', color: 'gray', fontSize: '20px', textAlign: 'center'}} 
                  className='poppins-regular'
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
                        marginLeft: '300px',
                        marginRight: '300px'
                      }}
                      onClick={() => handleApplicationClick(app)}
                    >
                        <div className='card-header'>
                            To: 
                            <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                            {app.pet.user.email}{' '}
                            ({app.pet.user?.animal_shelter 
                            ? `${app.pet.user.organization_name ?? 'N/A'}`
                            : `${app.pet.user?.first_name ?? ''} ${app.pet.user?.last_name ?? ''}`.trim()
                            })
                        </div>
                        <div className='card-body'>
                            <h5 className='card-title'><strong>{app.pet.breed} ({app.pet.type})</strong></h5>
                            {app.status === 'Approved' && <p className='card-text'><small>Status:</small><small style={{color: 'green'}}> {app.status}</small></p>}
                            {app.status === 'Rejected' && <p className='card-text'><small>Status:</small><small style={{color: 'red'}}> {app.status}</small></p>}
                            {app.status === 'Pending' && <p className='card-text'><small>Status:</small><small style={{color: '#999'}}> {app.status}</small></p>}
                        </div>
                    </div>
                ))
            )}
        </div>
        </>
    )
}

export default ApplicationsSent