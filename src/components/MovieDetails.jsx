// MovieDetails.jsx – Shows full details of one movie using its :id
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from route
  const [movie, setMovie] = useState(null); // Store movie data
  
  // --- Logic Integration (Bon's Code) ---
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch movie details
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // save reviews even when reloading the page
    const savedReviews = localStorage.getItem(`reviews-${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }

    // save rating even when reloading
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
  if (!movie) return <div className="details-container">Loading...</div>;

  return (
    <div className="details-container">
      {/* Movie Info Section (Your Design Structure) */}
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        
        {/* Metadata formatted as a list under description */}
        <div className="movie-meta">
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Producer:</strong> {movie.producer}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>RT Score:</strong> {movie.rt_score}</p>
        </div>
      </div>

      {/* Review Section */}
      <section className="review-section">
        <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Reviews</h2>
          {/* Interactive Star Rater */}
          <div className="rating-stars" style={{ display: 'flex', gap: '5px', cursor: 'pointer', fontSize: '24px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                // if star <= rating is true , add "filled"
                className={star <= rating ? "star filled" : "star"}
                style={{ color: star <= rating ? "#f59e0b" : "#d1d5db", transition: "color 0.2s" }}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="review-form">
          <textarea
            className="review-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="This is the greatest movie because..."
          />
          {/* submit disabled until rating is selected */}
          <button 
            className="save-button" 
            onClick={handleSubmit} 
            disabled={rating === 0}
          >
            Submit Review
          </button>
        </div>

        {/* List of Submitted Reviews */}
        <div className="submitted-reviews-list" style={{ marginTop: '20px' }}>
          {reviews.map((review, index) => (
            <div key={index} className="review-item" style={{ padding: '15px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', marginBottom: '10px', border: '1px solid #333333' }}>
              <h3 style={{ color: '#f59e0b', margin: '0 0 5px 0' }}>{review.rating}/5 ★</h3>
              <p style={{ margin: 0 }}>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}

export default MovieDetails;