// allow users to add their reviews

import React, { useState } from "react";
import Navbar from "./Navbar";

const ReviewForm = ({ user }) => {
    const [newReview, setNewReview] = useState(null);

    function handleReviewChange(e) {
        setNewReview(e.target.value);
    }

    function handleReviewSubmit(e) {
        // e.preventDefault();

        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                comment: newReview
            })
        })
        .then((response) => {
            if (response.ok) {
                alert('review added successfully');
                return response.json();
            }
        })
        .then((review) => {
            console.log(review);
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <>
        <Navbar user={user} />
        <div style={{marginTop: '100px'}} className="poppins-regular">
        <div className='aboutHeaders' style={{marginBottom: '50px' }}>
                <h4 style={{ display: 'inline-block', margin: 0 }}>Contacts</h4>
                <div style={{
                        margin: '8px auto 0',
                        width: '90px',
                        borderBottom: '3px solid maroon'
                }}></div>
            </div>
            <div style={{textAlign: 'center'}}>
                <h5>Email: furrylink@example.com</h5>
                <h5>Telephone: 0700-000-000</h5>
                <h5>Twitter: example</h5>
                <h5>Instagram: example</h5>
            </div>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px',
                marginBottom: '100px'
              }}
            >
                <div 
                  style={{
                      flex: 1,
                      height: '1px',
                      borderTop: '2px solid maroon',
                      marginRight: '10px', 
                      marginLeft: '100px'
                    }}
                > 
                </div>
                <p style={{
                    margin: 0,
                    padding: '0 10px',
                    color: 'maroon',
                    textAlign: 'center'
                }}>or</p>
                <div style={{
                        flex: 1,
                        height: '1px',
                        borderTop: '2px solid maroon',
                        marginLeft: '10px',
                        marginRight: '100px'
                    }}></div>
            </div>
        <div className='aboutHeaders poppins-regular' style={{marginBottom: '50px' }}>
            <h4 style={{ display: 'inline-block', margin: 0 }}>Leave Us a Review</h4>
            <div style={{
                margin: '8px auto 0',
                width: '180px',
                borderBottom: '3px solid maroon'
            }}></div>
        </div>
        <form onSubmit={handleReviewSubmit} className="addReview poppins-regular row g-0">
            <div className='col-md-6'>
                <textarea
                  name="comment"
                  id="comment"
                  type="text"
                  value={newReview}
                  onChange={handleReviewChange}
                  style={{
                    width: '100%'
                  }}
                />
                <input
                type="submit"
                value='Post review'
                className='signUpSubmit btn btn-primary col-12'
                style={{
                    marginBottom: '50px',
                    marginLeft: '120px'
                }}
            />
            </div>
        </form>
        </div>
        </>
    )
}

export default ReviewForm;