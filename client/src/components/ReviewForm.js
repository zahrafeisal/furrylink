// allow users to add their reviews

import React, { useState } from "react";
import Reviews from "./Reviews";

const ReviewForm = () => {
    const [newReview, setNewReview] = useState(null);

    function handleReviewChange(e) {
        setNewReview(e.target.value);
    }

    function handleReviewSubmit(e) {
        e.preventDefault();

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
        <Reviews />
        <div className='signUpHeader'>
            <h2 className='dancing-script-landingPageh1'><strong>Feel free to leave us a review!</strong></h2>  
        </div>
        <form onSubmit={handleReviewSubmit} className="addReview row g-0">
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
                className='signUpSubmit col-12'
                style={{
                    marginBottom: '30px'
                }}
            />
            </div>
        </form>
        </>
    )
}

export default ReviewForm;