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
        <form onSubmit={handleReviewSubmit}>
            <input
              name="comment"
              type="text"
              value={newReview}
              onChange={handleReviewChange}
            />
            <input
              type="submit"
              value={'Add Review'}
            />
        </form>
        </>
    )
}

export default ReviewForm;