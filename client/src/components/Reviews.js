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
        <div className="addPet poppins-regular">
           <div className='aboutHeaders' style={{marginBottom: '50px' }}>
                <h4 style={{ display: 'inline-block', margin: 0 }}>Our Reviews</h4>
                <div style={{
                    margin: '8px auto 0',
                    width: '150px',
                    borderBottom: '3px solid maroon'
                }}></div>
            </div>
            {reviews.length === 0 ? (
                <p 
                    style={{paddingTop: '10px', color: 'gray', fontSize: '20px', paddingLeft: '650px'}} 
                    className='poppins-regular'
                >
                  <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                  No reviews yet. Please check back later!
                </p>
            ) : (
                <div>
                    {reviews.map(review => (
                    <div 
                      key={review.id}
                      className="card"
                      style={{
                        border: '1px solid #999',
                        padding: '10px',
                        marginLeft: '300px',
                        marginRight: '300px'
                      }}>
                        <div className="card-header">
                            <i className="fa-solid fa-user" style={{color: '#999', paddingRight: '10px', paddingLeft: '10px'}}></i>
                            {review.user.first_name} {review.user.last_name}
                        </div>
                        <div className="card-body">
                        <p className="card-text">{review.comment}</p> 
                        </div>
                        <div className="card-footer" style={{backgroundColor: 'white', color: '#999', paddingBottom: '0'}} >
                            <p>{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default Reviews;