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
        <div>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.user.email}</p>
                    <p>{review.date}</p>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default Reviews;