import React, { use, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";

function AppRcvdDetails({ user }) {
    const API_BASE = process.env.REACT_APP_API_URL;

    const location = useLocation();
    const applicationData = location.state?.app;

    // Initialize state with the application's current data
    const [application, setApplication] = useState(applicationData);
    const [errorMessage, setErrorMessage] = useState(null);

    if (!application) {
        return <p>No application data available.</p>;
    }

    function handleStatusChange(applicationId, newStatus) {
        fetch(`${API_BASE}/application/${applicationId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then((response) => {
            if (response.ok) {
                setErrorMessage(null);
                return response.json();
            } else if (response.status === 404) {
                setErrorMessage("Application not found.");
            } else if (response.status === 401) {
                setErrorMessage("Not authorized.")
            } else if (response.status === 400) {
                setErrorMessage("Invalid status.")
            }
        })
        .then((updatedApplication) => {
            // Update local state with the new data
            setApplication(updatedApplication);
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    }

    // Only show buttons if status is "Pending"
    const isPending = application.status === "Pending";

    return (
        <>
        <Navbar user={user} />
        <div className="appDetails poppins-regular">
            <h2>Application Details</h2>
            <div className="card"
            style={{
                border: '1px solid black',
                margin: '10px',
                padding: '5px',
                marginLeft: '300px',
                marginRight: '300px'
            }}
            >
                <div className="card-header">
                    From: 
                    <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                    {application?.user?.email} {' '}
                    ({application?.user?.animal_shelter
                        ? `${application.user.organization_name ?? 'N/A'}`
                        : `${application?.user?.first_name ?? ''} ${application?.user?.last_name ?? ''}`.trim()
                    })
                </div>
                <div className="card-body">
                    <div className='appImg'>
                        <img src={`https://furrylink-backend.onrender.com/uploads/${application.pet.image_filename}`} alt={application.pet.breed} />
                    </div>
                    <h4 style={{paddingBottom: '10px', paddingTop: '10px'}} className='card-title'>{application.pet?.breed ?? 'N/A'} ({application.pet?.type ?? 'N/A'})</h4>
                    <p><strong>Age: </strong>{application.pet.age} yrs.</p>
                    <p><strong>Price: </strong>Ksh. {application.pet.price}</p>
                    <div>
                        <p className="card-text"><strong>Description</strong></p>
                        <small className="card-text">{application.description ?? 'N/A'}</small>
                    </div>
                    {/* Show approval/rejection buttons only if status is "Pending" */}
                    {isPending && (
                        <>
                        <div style={{marginTop: '20px'}} >
                            <button
                              onClick={() => handleStatusChange(application.id, 'Approved')}
                              type="button"
                              className="btn btn-outline-primary"
                            >
                                Approve
                            </button>
                            <button 
                              onClick={() => handleStatusChange(application.id, 'Rejected')} style={{ marginLeft: '5px' }}
                              type="button"
                              className="btn btn-outline-danger"
                            >
                                Reject
                            </button>
                            {errorMessage && (
                                <div style={{ color: 'red', paddingTop: '10px', paddingBottom: '10px' }}>{errorMessage}</div>
                            )}
                        </div>
                        </>
                    )}
                </div>
                <div className="card-footer">
                    {application.status === 'Approved' && <p className='card-text'><small>Status:</small><small style={{color: 'green'}}> {application.status}</small></p>}
                    {application.status === 'Rejected' && <p className='card-text'><small>Status:</small><small style={{color: 'red'}}> {application.status}</small></p>}
                    {application.status === 'Pending' && <p className='card-text'><small>Status:</small><small style={{color: '#999'}}> {application.status}</small></p>}
                </div>
            </div>
        </div>
        </>
    );
}

export default AppRcvdDetails;