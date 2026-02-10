// App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Favourites from './components/Favourites';
  
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/favourites" element={<Favourites />} />
            </Routes>
        </BrowserRouter>
    );
}
  
export default App;