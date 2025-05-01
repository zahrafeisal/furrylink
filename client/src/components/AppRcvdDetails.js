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
        <div>
            <h2>Application Details</h2>
            <p><strong>Pet:</strong> {application.pet.breed} ({application.pet.type})</p>
            <p>
                <strong>Applicant:</strong>
                {application.user?.animal_shelter
                    ? `${application.user.organization_name ?? 'N/A'}`
                    : `${application.user?.first_name ?? ''} ${application.user?.last_name ?? ''}`.trim()
                }
            </p>
            <p><strong>Description:</strong> {application.description}</p>
            <p><strong>Status:</strong> {application.status}</p>

            {/* Show approval/rejection buttons only if status is "Pending" */}
            {isPending && (
                <>
                    <button onClick={() => handleStatusChange(application.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleStatusChange(application.id, 'Rejected')} style={{ marginLeft: '10px' }}>Reject</button>
                </>
            )}
        </div>
    );
}

export default AppRcvdDetails;