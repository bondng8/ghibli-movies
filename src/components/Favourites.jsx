// Favourites.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favourites() {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://ghibliapi.vercel.app/films')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const favouriteMovies = movies.filter(movie => favourites.includes(movie.id));

    const removeFavourite = (movieId) => {
        const updatedFavourites = favourites.filter(favId => favId !== movieId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Your Favourites</h1>
                <Link to="/" className="back-link">← Back to Home</Link>
            </header>

            {favouriteMovies.length === 0 ? (
                <div className="empty-state">
                    <h2>No Favourite Movies Yet</h2>
                    <p>Go back to the home page and add some Ghibli classics!</p>
                </div>
            ) : (
                <main className="movie-grid">
                    {favouriteMovies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <div className="movie-card-content">
                                <Link to={`/movie/${movie.id}`} className="movie-title">
                                    {movie.title}
                                </Link>
                                <p className="movie-meta">{movie.release_date} • {movie.director}</p>
                                <button className="fav-button active" onClick={() => removeFavourite(movie.id)}> 💔 Remove Favourite </button>
                            </div>
                        </div>
                    ))}
                </main>
            )}
        </div>
    );
}

export default Favourites;