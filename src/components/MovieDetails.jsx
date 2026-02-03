// MovieDetails.jsx – Shows full details of one movie using its :id

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from route
  const [movie, setMovie] = useState(null); // Store movie data

  // Fetch movie details when ID changes or page loads
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  // Loading screen while fetching data
  if (!movie) return <p>Loading…</p>;

  return (
    <div className="movie-details">
      {/* Main info */}
      <div className="movie-details-main">
        <h1>{movie.title}</h1>
        <p className="movie-details-description">{movie.description}</p>
      </div>

      {/* Metadata section */}
      <div className="movie-details-meta">
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Producer:</strong> {movie.producer}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>RT Score:</strong> {movie.rt_score}</p>

        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default MovieDetails;
