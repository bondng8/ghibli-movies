// MovieDetails.jsx – Shows full details of one movie using its :id

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from route
  const [movie, setMovie] = useState(null); // Store movie data
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch movie details when ID changes or page loads
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // save reviews even when reloading the page
    const savedReviews = localStorage.getItem(`reviews-${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }

    // svae rating even when reloading
    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, [id]);

  // handle submit btn
  const handleSubmit = () => {
    if (reviewText.trim() && rating > 0) {
      const newReviews = [...reviews, { text: reviewText, rating }];
      setReviews(newReviews);
      localStorage.setItem(`reviews-${id}`, JSON.stringify(newReviews));
      setReviewText("");
      setRating(0);
      localStorage.removeItem(`rating-${id}`);
    }
  };
  // handle the rating
  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${id}`, value);
  };

  // Loading screen while fetching data
  if (!movie) return <p>Loading…</p>;

  return (
    <div className="movie-details">
      {/* Main info */}
      <div className="movie-details-main">
        <h1>{movie.title}</h1>
        <p className="movie-details-description">{movie.description}</p>

        <div className="review-container">
          <div className="review-header">
            <h2>Reviews</h2>
            {/* interactive 1-5 stars rating selector */}
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  // if star <= rating is true , add "filled", otherwiese not highlighted
                  className={star <= rating ? "star filled" : "star"}
                  onClick={() => handleRating(star)}>★</span>
              ))}
            </div>
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows="4"
          />
           {/* submit disabled until rating is selected) */}
          <button onClick={handleSubmit} disabled={rating === 0}>
            Submit Review
          </button>
          
          {/* display saved review items with text and rating */}
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <h3>{review.rating}/5★</h3>
              <p style={{ margin: 0 }}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata section */}
      <div className="movie-details-meta">
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
        <p>
          <strong>Producer:</strong> {movie.producer}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>RT Score:</strong> {movie.rt_score}
        </p>

        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default MovieDetails;
