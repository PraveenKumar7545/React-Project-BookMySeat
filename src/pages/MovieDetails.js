// src/pages/MovieDetails.js
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdbApi';
import Loading from '../components/Loading';

function MovieDetails() {
  const { id } = useParams();          // gets the movie id from the URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    }

    loadMovie();
  }, [id]);

  // Demo ticket prices (we will make them more advanced later)
  const ticketPrices = {
    front: 70,
    standard: 130,
    premium: 180,
    back: 200,
  };

  const handleBookTickets = () => {
    // Save selected movie in localStorage so next pages can use it
    if (movie) {
      localStorage.setItem('cineseat_selected_movie', JSON.stringify({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        runtime: movie.runtime,
        language: movie.original_language,
        rating: movie.vote_average,
      }));
    }
    // Go to Theatre & Shows page (we will create it in Phase 6)
    navigate(`/theatre/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex-grow flex items-center justify-center text-center p-6">
        <div>
          <p className="text-xl text-black mb-4">Movie not found</p>
          <Link
            to="/movies"
            className="text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back button */}
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors duration-200"
        >
          ← Back to Movies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left - Poster */}
          <div className="lg:col-span-1">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full rounded-2xl shadow-xl border border-gray-200"
            />
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {movie.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-6">
              <span className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                {movie.original_language?.toUpperCase()}
              </span>

              <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                {movie.release_date}
              </span>

              <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                {movie.runtime} min
              </span>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-2">
                Overview
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Ticket Pricing */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Ticket Prices
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">Front</p>
                  <p className="text-xl font-bold text-black">
                    ₹{ticketPrices.front}
                  </p>
                </div>

                <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">Standard</p>
                  <p className="text-xl font-bold text-black">
                    ₹{ticketPrices.standard}
                  </p>
                </div>

                <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">Premium</p>
                  <p className="text-xl font-bold text-black">
                    ₹{ticketPrices.premium}
                  </p>
                </div>

                <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">Back</p>
                  <p className="text-xl font-bold text-black">
                    ₹{ticketPrices.back}
                  </p>
                </div>

              </div>

              <p className="text-xs text-gray-500 mt-3">
                * Prices may change for FDFS / Special Shows
              </p>
            </div>

            {/* Book Tickets Button */}
            <button
              onClick={handleBookTickets}
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Book Tickets
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;