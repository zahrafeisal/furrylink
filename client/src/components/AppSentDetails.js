import React from "react";
import { useLocation } from "react-router";

function AppSentDetails() {
    const location = useLocation()
    const application = location.state?.app

    if (!application) {
        return <p>No application data available.</p>;
    }

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
                    To: 
                    <i className="fa-solid fa-envelope" style={{color: '#999', paddingRight: '5px', paddingLeft: '10px'}}></i>
                    {application?.pet?.user?.email} {' '}
                    ({application?.pet.user?.animal_shelter
                        ? `${application.pet.user.organization_name ?? 'N/A'}`
                        : `${application?.pet.user?.first_name ?? ''} ${application?.pet.user?.last_name ?? ''}`.trim()
                    })
                </div>
                <div className="card-body">
                    <div className='appImg'>
                        <img src={"/uploads/" + application.pet.image_filename} alt={application.pet.breed} />
                    </div>
                    <h3 style={{paddingBottom: '10px', paddingTop: '10px'}} className='card-title'><strong>{application.pet?.breed ?? 'N/A'} ({application.pet?.type ?? 'N/A'})</strong></h3>
                    <h5 className="card-text">Description: </h5>
                    <p className="card-text">{application.description ?? 'N/A'}</p>
                </div>
                <div className="card-footer">
                    Status: {application.status ?? 'N/A'}
                </div>
            </div>
        </div>
    );
}

export default AppSentDetails;