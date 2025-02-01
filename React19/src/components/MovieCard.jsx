import React from 'react'

const MovieCard = ({
                       anime:
                           {
                               name, id, poster_path, origin_country, original_language
                               , vote_average, first_air_date
                           }
                   }) => {
    return (
        <div className="movie-card">
            <p key={id} className="text-white">{name}</p>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={name}/>
            <div className="mt-4">
                <h3>{name}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star" />
                        <p>{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
            </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {first_air_date ? first_air_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
