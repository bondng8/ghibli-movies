// Favourites.jsx – Shows only the movies saved as favourites

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favourites() {
  // Load saved favourite movie IDs from localStorage
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem('favourites')) || []
  );

  // Store all movies from API
  const [movies, setMovies] = useState([]);

  // Fetch all movies so we can compare with favourite IDs
  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  // Filter only favourite movies
  const favouriteMovies = movies.filter(movie =>
    favourites.includes(movie.id)
  );

  // Remove a movie from favourites
  const removeFavourite = (id) => {
    const updated = favourites.filter(favId => favId !== id);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div className="favourites-page">
      <h1>Favourite Movies</h1>
      <Link to="/">← Back to Home</Link>

      {favouriteMovies.length === 0 ? (
        <p>You don’t have any favourites yet.</p>
      ) : (
        <ul className="movie-list">
          {favouriteMovies.map(movie => (
            <li key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>

              <button
                className="favourite-btn favourite-btn--remove"
                onClick={() => removeFavourite(movie.id)}
              >
                Remove Favourite
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favourites;
