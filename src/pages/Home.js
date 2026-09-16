// src/pages/Home.js

import { useState, useEffect } from 'react';
import {
  getTrendingMovies,
  getMoviesByLanguage,
  getTrendingTV
} from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [tamilMovies, setTamilMovies] = useState([]);
  const [teluguMovies, setTeluguMovies] = useState([]);
  const [malayalamMovies, setMalayalamMovies] = useState([]);
  const [kannadaMovies, setKannadaMovies] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [englishMovies, setEnglishMovies] = useState([]);
  const [webSeries, setWebSeries] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem('cineseat_user') || 'null'
  );

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);

      try {
        const [
          trending,
          tamil,
          telugu,
          malayalam,
          kannada,
          hindi,
          english,
          tv
        ] = await Promise.all([
          getTrendingMovies(),
          getMoviesByLanguage('ta'),
          getMoviesByLanguage('te'),
          getMoviesByLanguage('ml'),
          getMoviesByLanguage('kn'),
          getMoviesByLanguage('hi'),
          getMoviesByLanguage('en'),
          getTrendingTV()
        ]);

        setTrendingMovies(trending);
        setTamilMovies(tamil);
        setTeluguMovies(telugu);
        setMalayalamMovies(malayalam);
        setKannadaMovies(kannada);
        setHindiMovies(hindi);
        setEnglishMovies(english);
        setWebSeries(tv);
      } catch (error) {
        console.error('Error loading home page:', error);
      }

      setLoading(false);
    }

    loadHomeData();
  }, []);

  // Movie Section Component
  function MovieSection({ title, movies }) {
    if (!movies || movies.length === 0) {
      return null;
    }

    return (
      <section className="mb-12">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-black">
            {title}
          </h2>

          <button className="text-black hover:text-gray-700 font-medium">
            See All →
          </button>

        </div>

        {/* Horizontal Movie Scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin">

          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[220px] w-[220px]"
            >
              <MovieCard movie={movie} />
            </div>
          ))}

        </div>

      </section>
    );
  }

  return (
    <div className="flex-grow bg-gray-100">

      {/* Hero Section */}
      <section className="bg-black text-white py-16 px-4">

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome{user ? `, ${user.name}` : ''}!
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Book Your Movie. Build Your Combo. Enjoy the Show.
          </p>

          <a
            href="/movies"
            className="inline-block bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-semibold transition"
          >
            Explore Movies
          </a>

        </div>

      </section>

      {/* Loading */}
      {loading && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {/* Movie Sections */}
      {!loading && (
        <main className="px-4 sm:px-6 lg:px-8 py-12">

          <div className="max-w-7xl mx-auto">

            {/* Trending */}
            <MovieSection
              title="🔥 Trending Movies"
              movies={trendingMovies}
            />

            {/* Tamil */}
            <MovieSection
              title="🇮🇳 Tamil Movies"
              movies={tamilMovies}
            />

            {/* Telugu */}
            <MovieSection
              title="🎬 Telugu Movies"
              movies={teluguMovies}
            />

            {/* Malayalam */}
            <MovieSection
              title="🎬 Malayalam Movies"
              movies={malayalamMovies}
            />

            {/* Kannada */}
            <MovieSection
              title="🎬 Kannada Movies"
              movies={kannadaMovies}
            />

            {/* Hindi */}
            <MovieSection
              title="🎬 Hindi Movies"
              movies={hindiMovies}
            />

            {/* English */}
            <MovieSection
              title="🌍 English Movies"
              movies={englishMovies}
            />

            {/* Web Series */}
            <MovieSection
              title="📺 Web Series"
              movies={webSeries}
            />

          </div>

        </main>
      )}

    </div>
  );
}

export default Home;