// Home.jsx – Search movies and manage favourites

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Store fetched movies and search input
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load saved favourites from localStorage
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem('favourites')) || []
  );

  // Fetch all movies and filter on client by title
  const searchMovies = () => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(data => {
        const term = searchTerm.toLowerCase().trim();

        // If input empty → show all movies
        const filtered = data.filter(movie =>
          movie.title.toLowerCase().includes(term)
        );

        setMovies(filtered);
      });
  };

  // Load movies when page opens
  useEffect(() => {
    searchMovies();
  }, []);

  // Save favourites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add / remove favourites
  const toggleFavourite = (movieId) => {
    setFavourites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId) // Remove
        : [...prev, movieId]                // Add new
    );
  };

  return (
    <div className="home">
      <h1>Studio Ghibli Movie Search</h1>

      {/* Subtitle */}
      <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '-5px' }}>
        Search Studio Ghibli movies and save your favourites ⭐
      </p>

      {/* Navigation */}
      <nav>
        <Link to="/favourites">View Favourites</Link>
      </nav>

      {/* Search box */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {/* Movie list */}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>

            <button
              className={
                favourites.includes(movie.id)
                  ? 'favourite-btn favourite-btn--active'
                  : 'favourite-btn'
              }
              onClick={() => toggleFavourite(movie.id)}
            >
              {favourites.includes(movie.id) ? '★ Favourited' : '☆ Favourite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
