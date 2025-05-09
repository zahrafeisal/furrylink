import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import Navbar from './Navbar';

function ApplicationsReceived({ user }) {
    const API_BASE = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [allApplications, setAllApplications] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchApps = () => {
        fetch(`${API_BASE}/applications`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.ok) {
                setErrorMessage(null);
                return response.json()
            }
        })
        .then((applications) => {
            setAllApplications(applications)
        })
        .catch((error) => {
            setErrorMessage(error.message)
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
        <>
        <Navbar user={user} />
        {!user.animal_shelter ? (
            <nav className='logOutNav poppins-regular' style={{paddingLeft: '30px', paddingTop: '20px'}} >
                <Link to={'/pet-applications'} style={{color: 'black'}} className='btn btn-outline-light'>Received</Link>
                <Link to={'/sent-applications'} style={{width: '100px'}} className='btn btn-primary' >Sent</Link>
            </nav> 
        ) : null}
        <div className='addPet poppins-regular'>
            <div style={{
                textAlign: 'center',
                paddingTop: '30px',
                paddingBottom: '30px'
            }} className='poppins-regular'>
                <h2>Received Applications</h2>  
            </div>  
            {appsReceived.length === 0 ? (
                <p 
                  style={{paddingTop: '150px', color: 'gray', fontSize: '20px', textAlign: 'center'}} 
                  className='poppins-regular'
                >
                    <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                    You haven't received any applications yet.
                </p>
            ) : (
                appsReceived.map(app => (
                    <div key={app.id} className='card'
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
                            From: 
                            <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                            {app.user.email}{' '}
                            ({app.user?.animal_shelter 
                            ? `${app.user.organization_name ?? 'N/A'}`
                            : `${app.user?.first_name ?? ''} ${app.user?.last_name ?? ''}`.trim()
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
            {errorMessage && (
                <div style={{ color: 'red', paddingTop: '10px', paddingBottom: '10px' }}>{errorMessage}</div>
            )}
        </div>
        </>
    )
}

export default ApplicationsReceived