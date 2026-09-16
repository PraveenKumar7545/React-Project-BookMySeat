// src/services/tmdbApi.js

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Get popular movies
export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Get trending movies
export async function getTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

// Get movies by language
export async function getMoviesByLanguage(language) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${language}&sort_by=popularity.desc&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies by language');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${language} movies:`, error);
    return [];
  }
}

// Get trending TV/web series
export async function getTrendingTV() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch TV shows');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

// Helper to get full image URL
export function getImageUrl(path) {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }

  return `${IMAGE_BASE_URL}${path}`;
}

// Get details of one movie by ID
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}