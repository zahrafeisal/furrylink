import React, { useState } from "react";
import { useLocation } from "react-router";

function AppRcvdDetails() {
    const location = useLocation();
    const applicationData = location.state?.app;

    // Initialize state with the application's current data
    const [application, setApplication] = useState(applicationData);

    if (!application) {
        return <p>No application data available.</p>;
    }

    function handleStatusChange(applicationId, newStatus) {
        fetch(`/application/${applicationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to update application status.");
            }
        })
        .then((updatedApplication) => {
            // Update local state with the new data
            setApplication(updatedApplication);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    // Only show buttons if status is "Pending"
    const isPending = application.status === "Pending";

    return (
        <div className="appDetails tinos-regular">
            <h2 className='dancing-script-landingPageh1'>Application Details</h2>
            <div className="card"
            style={{
                border: '1px solid black',
                margin: '10px',
                padding: '10px',
                marginLeft: '360px',
                marginRight: '360px'
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
                        <img src={"/uploads/" + application.pet.image_filename} alt={application.pet.breed} />
                    </div>
                    <h3 style={{paddingBottom: '10px', paddingTop: '10px'}} className='card-title'><strong>{application.pet?.breed ?? 'N/A'} ({application.pet?.type ?? 'N/A'})</strong></h3>
                    <h5 className="card-text">Description: </h5>
                    <p className="card-text">{application.description ?? 'N/A'}</p>
                    {/* Show approval/rejection buttons only if status is "Pending" */}
                    {isPending && (
                        <>
                            <button
                              onClick={() => handleStatusChange(application.id, 'Approved')}
                              type="button"
                              className="btn btn-primary"
                            >
                                Approve
                            </button>
                            <button 
                              onClick={() => handleStatusChange(application.id, 'Rejected')} style={{ marginLeft: '10px' }}
                              type="button"
                              className="btn btn-danger"
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
                <div className="card-footer">
                    Status: {application.status ?? 'N/A'}
                </div>
            </div>
        </div>
    );
}

export default AppRcvdDetails;