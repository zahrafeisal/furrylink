import React from "react";
import { useLocation } from "react-router";

function AppSentDetails() {
    const location = useLocation()
    const application = location.state?.app

    if (!application) {
        return <p>No application data available.</p>;
    }

    return (
        <div>
            <h2>Application Details</h2>
            <p>
                <strong>Pet:</strong> {application.pet?.breed ?? 'N/A'} ({application.pet?.type ?? 'N/A'})
            </p>
            <p>
                <strong>Sent to:</strong>
                {application?.pet.user?.animal_shelter
                    ? `${application.pet.user.organization_name ?? 'N/A'}`
                    : `${application?.pet.user?.first_name ?? ''} ${application?.pet.user?.last_name ?? ''}`.trim()
                }
            </p>
            <p><strong>Description:</strong> {application.description ?? 'N/A'}</p>
            <p><strong>Status:</strong> {application.status ?? 'N/A'}</p>
        </div>
    );
}

export default AppSentDetails;