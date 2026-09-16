// src/components/MovieCard.js 
import { Link } from 'react-router-dom'; 
import { getImageUrl } from '../services/tmdbApi'; 
 
function MovieCard({ movie }) { 
  return ( 
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/20"> 
       
      {/* Poster */} 
      <div className="relative aspect-[2/3] overflow-hidden"> 
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          className="w-full h-full object-cover" 
        /> 
        {/* Rating badge */} 
        <div className="absolute top-3 right-3 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"> 
          ⭐ {movie.vote_average?.toFixed(1)} 
        </div> 
      </div> 
 
      {/* Info */} 
      <div className="p-4"> 
        <h3 className="text-black font-semibold text-lg line-clamp-1 mb-1"> 
          {movie.title} 
        </h3> 
 
        <div className="flex items-center justify-between text-sm text-black mb-4"> 
          <span>{movie.original_language?.toUpperCase()}</span> 
          <span>{movie.release_date?.slice(0, 4)}</span> 
        </div> 
 
        <Link 
          to={`/movie/${movie.id}`} 
          className="block w-full text-center bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl font-medium transition-colors" 
        > 
          Book Now 
        </Link> 
      </div> 
    </div> 
  ); 
} 
 
export default MovieCard;