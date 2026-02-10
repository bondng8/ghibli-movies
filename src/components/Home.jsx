// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    const searchMovies = () => {
        fetch(`https://ghibliapi.vercel.app/films?limit=250`)
            .then(response => response.json())
            .then(data => {
                const filteredMovies = data.filter(movie => 
                    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setMovies(filteredMovies);
            })
            .catch(error => console.error('Error searching movies:', error));
    };

    const toggleFavourite = (movie) => {
        const updatedFavourites = favourites.includes(movie.id)
            ? favourites.filter(favId => favId !== movie.id)
            : [...favourites, movie.id];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    useEffect(() => {
        fetch('https://ghibliapi.vercel.app/films/')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Studio Ghibli Movies</h1>
                <h5>Search Studio Ghibli movies and save your favourites!</h5>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={searchMovies} className="search-button">Search</button>
                </div>
                <Link to="/favourites" className="fav-nav-link">View Favourites ({favourites.length})</Link>
            </header>

            <main className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <div className="movie-card-content">
                            <Link to={`/movie/${movie.id}`} className="movie-title">
                                {movie.title}
                            </Link>
                            <p className="movie-meta">{movie.release_date} • {movie.director}</p>
                            <button 
                                className={`fav-button ${favourites.includes(movie.id) ? 'active' : ''}`}
                                onClick={() => toggleFavourite(movie)}
                            >
                                {favourites.includes(movie.id) ? '❤️ Favourited' : '🤍 Favourite'}
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Home;