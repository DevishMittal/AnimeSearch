import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';

// Basic Navbar for now
const Navbar = () => {
    return (
        <nav className="w-full flex justify-between items-center py-4 px-8 border-b border-white/10 glass-nav absolute top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-white tracking-widest flex items-center gap-2">
                <span className="text-gradient">Anime</span>Search
            </Link>
            <div className="flex gap-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Discover</Link>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Login</Link>
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="pt-20"> {/* Padding to account for absolute nav */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Future routes will be added here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
