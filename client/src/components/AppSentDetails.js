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
            <p><strong>Pet:</strong> {application.pet.breed} ({application.pet.type})</p>
            <p><strong>Applicant:</strong> {application.user.first_name} {application.user.last_name}</p>
            <p><strong>Description:</strong> {application.description}</p>
            <p><strong>Status:</strong> {application.status}</p>
        </div>
    );
}

export default AppSentDetails