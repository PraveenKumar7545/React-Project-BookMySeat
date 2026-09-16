// src/pages/Movies.js  
import { useState, useEffect } from 'react';  
import { getPopularMovies } from '../services/tmdbApi';  
import MovieCard from '../components/MovieCard';  
import Loading from '../components/Loading';  
  
function Movies() {  
  const [movies, setMovies] = useState([]);  
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {  
    async function loadMovies() {  
      setLoading(true);  
      const data = await getPopularMovies();

      const languageOrder = {
        ta: 1, // Tamil
        te: 2, // Telugu
        ml: 3, // Malayalam
        kn: 4, // Kannada
        hi: 5, // Hindi
        en: 6, // English
        ko: 7, // Korean
        ja: 8  // Japanese
      };

      const sortedMovies = [...data].sort((a, b) => {
        const orderA = languageOrder[a.original_language] || 99;
        const orderB = languageOrder[b.original_language] || 99;

        return orderA - orderB;
      });

      setMovies(sortedMovies);
      setLoading(false);  
    }  
  
    loadMovies();  
  }, []);  
  
  return (  
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">  
      <div className="max-w-7xl mx-auto">  
  
        {/* Header */}  
        <div className="text-center mb-10">  
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">  
            Now Showing  
          </h1>  
  
          <p className="text-gray-600 text-lg">  
            Choose your movie and start building your cinema experience  
          </p>  
        </div>  
  
        {/* Loading */}  
        {loading && <Loading />}  
  
        {/* Movies Grid */}  
        {!loading && (  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">  
            {movies.map((movie) => (  
              <MovieCard key={movie.id} movie={movie} />  
            ))}  
          </div>  
        )}  
  
        {/* Empty state */}  
        {!loading && movies.length === 0 && (  
          <div className="text-center py-20 text-gray-600">  
            <p className="text-xl text-black">No movies found.</p>  
  
            <p className="mt-2 text-sm text-gray-500">  
              Please check your TMDB API key.  
            </p>  
          </div>  
        )}  
  
      </div>  
    </div>  
  );  
}  
  
export default Movies;