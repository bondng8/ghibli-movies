// MovieDetails.jsx – Shows full details of one movie using its :id

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from route
  const [movie, setMovie] = useState(null); // Store movie data
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Fetch movie details when ID changes or page loads
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // save data even when reloading the page 
    const savedReviews = localStorage.getItem(`reviews-${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]);

  const handleSubmit = () => {
    if (reviewText.trim()) {
      const newReviews = [...reviews, reviewText];
      setReviews(newReviews);
      localStorage.setItem(`reviews-${id}`, JSON.stringify(newReviews));
      setReviewText("");
    }
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
          <h2>Reviews</h2>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows="4"
          />
          <button onClick={handleSubmit}>Submit Review</button>

          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              {review}
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
