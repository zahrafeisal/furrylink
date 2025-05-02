import React from "react";
import { useState, useEffect } from "react";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
            fetch("/reviews")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((reviews) => {
                console.log(reviews);
                setReviews(reviews);
            })
            .catch((error) => {
                alert(error.message)
            })
    }, [])

    return (
        <div className="addPet">
            <div className='signUpHeader'>
                <h2 className='tinos-regular'><strong>Reviews</strong></h2>  
            </div>  
            {reviews.length === 0 ? (
                <p 
                    style={{paddingTop: '10px', color: 'gray', fontSize: '20px', paddingLeft: '650px'}} 
                    className='tinos-regular'
                >
                  <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                  No reviews yet. Please check back later!
                </p>
            ) : (
                reviews.map(review => (
                    <div 
                      key={review.id}
                      className="card"
                      style={{
                        border: '1px solid black',
                        margin: '10px',
                        padding: '10px',
                        cursor: 'pointer',
                        marginLeft: '360px',
                        marginRight: '360px'
                      }}>
                        <div className="card-header">
                            <i className="fa-solid fa-user" style={{color: '#999', paddingRight: '10px', paddingLeft: '10px'}}></i>
                            {review.user.first_name} {review.user.last_name}
                        </div>
                        <div className="card-body">
                        <p className="card-text">{review.comment}</p> 
                        </div>
                        <div className="card-footer">
                            <p>Posted {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Reviews;