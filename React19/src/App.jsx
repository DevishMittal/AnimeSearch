import React, { useEffect, useState } from 'react';
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from 'react-use';
import {getTrendingAnime, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [trendingAnime, setTrendingAnime] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    useDebounce(()=> setDebounceSearchTerm(searchTerm), 750,[searchTerm]);

    const fetchAnime = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endpoint = query ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
           : `${API_BASE_URL}/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP&with_original_language=ja&api_key=${API_KEY}`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch anime');
            }

            const data = await response.json();
            setAnimeList(data.results || []);

            if(query &&data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (err) {
            console.error(`Error fetching anime: ${err}`);
            setErrorMessage('Error fetching anime. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingAnime = async () => {
        try{
    const anime = await getTrendingAnime();

        setTrendingAnime(anime);
        }catch(error){
            console.error(`Error fetching trending anime ${error}`);
        }
    }
    useEffect(() => {
        fetchAnime(debounceSearchTerm);
    }, [debounceSearchTerm]);

    useEffect(() => {
        loadTrendingAnime();
    },[]);

    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="Hero Banner" />
                        <h1>
                            Find The right <span className="text-gradient">Anime </span>for you
                        </h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>
                    {trendingAnime.length > 0 && (
                        <section className="trending">
                            <h2>Trending Anime</h2>

                            <ul>{trendingAnime.map((anime, index) => (

                           <li key={anime.$id}>
                               <p>{index + 1}</p>
                               <img src={anime.poster_url} alt={anime.name} />
                           </li> ))

                            }</ul>
                        </section>
                    )}
                    <section className="all-movies">
                        <h2 >All Anime</h2>
                        {isLoading ? (
                            <Spinner />
                        ) : errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ) : (
                            <ul>
                                {animeList.map((anime) => (
                                   <MovieCard key={anime.id} anime={anime} />
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default App;