// App.jsx – Defines all page routes and handles navigation

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Favourites from './components/Favourites';

function App() {
  return (
    // Enables page navigation without refresh
    <BrowserRouter>
      <Routes>
        {/* Homepage – search + list movies */}
        <Route path="/" element={<Home />} />

        {/* Dynamic movie details route */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Display only saved favourites */}
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export for use in main.jsx
export default App;
