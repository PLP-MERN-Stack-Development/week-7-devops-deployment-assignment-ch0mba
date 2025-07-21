// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookSearch from './components/BookSearch/BookSearch';
import Favorites from './components/Favourites/Favourites';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">📚 Bookstore</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-blue-600 hover:underline">
                Search
              </Link>
              <Link to="/favorites" className="text-blue-600 hover:underline">
                Favorites
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<BookSearch />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}