import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Globe, PlayCircle } from 'lucide-react';
import Spinner from '../components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
};

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/tv/${id}?api_key=${API_KEY}`, API_OPTIONS);

                if (!response.ok) throw new Error('Failed to fetch anime details');

                const data = await response.json();
                setAnime(data);
            } catch (err) {
                console.error(err);
                setError('Could not load anime details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><Spinner /></div>;
    if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
    if (!anime) return <div className="min-h-screen flex justify-center items-center text-white">No details found.</div>;

    return (
        <motion.div 
            className="min-h-screen text-white relative pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Backdrop */}
            <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden">
                <img 
                    src={anime.backdrop_path ? `https://image.tmdb.org/t/p/original/${anime.backdrop_path}` : '/hero-bg.png'} 
                    alt={anime.name} 
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-5 h-5" /> Back to Discover
                </Link>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Poster */}
                    <motion.div 
                        className="flex-shrink-0 w-64 md:w-80 rounded-2xl overflow-hidden glass-nav shadow-2xl border border-white/10"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img 
                            src={anime.poster_path ? `https://image.tmdb.org/t/p/w500/${anime.poster_path}` : '/no-movie.png'} 
                            alt={anime.name} 
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Details Container */}
                    <motion.div 
                        className="flex-1"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 !text-left !mx-0 !max-w-none">{anime.name}</h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-8 font-medium">
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                                <Star className="w-4 h-4 text-yellow-500" /> 
                                {anime.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                                <Calendar className="w-4 h-4" /> 
                                {anime.first_air_date ? anime.first_air_date.split('-')[0] : 'N/A'}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                                <PlayCircle className="w-4 h-4" /> 
                                {anime.number_of_episodes} Episodes
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5 uppercase">
                                <Globe className="w-4 h-4" /> 
                                {anime.original_language}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-3 !text-left">Overview</h2>
                            <p className="text-gray-300 leading-relaxed text-lg bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                {anime.overview || "No overview available."}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres?.map(genre => (
                                    <span key={genre.id} className="px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/10 text-sm font-medium">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnimeDetails;
