import React from "react";
import { useLocation } from "react-router";

function AppRcvdDetails() {
    const location = useLocation();
    const application = location.state?.app;

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
            console.log(updatedApplication);
            // Update state here if needed, e.g., show updated status
        })
        .catch((error) => {
            alert(error.message)
        });
    }

    return (
        <div>
            <h2>Application Details</h2>
            <p><strong>Pet:</strong> {application.pet.breed} ({application.pet.type})</p>
            <p><strong>Applicant:</strong> {application.user.first_name} {application.user.last_name}</p>
            <p><strong>Description:</strong> {application.description}</p>
            <p><strong>Status:</strong> {application.status}</p>

            {/* Show buttons unconditionally */}
            {application.status !== 'Approved' && (
                <button onClick={() => handleStatusChange(application.id, 'Approved')}>Approve</button>
            )}
            {application.status !== 'Rejected' && (
                <button onClick={() => handleStatusChange(application.id, 'Rejected')} style={{ marginLeft: '10px' }}>Reject</button>
            )}
        </div>
    );
}

export default AppRcvdDetails;