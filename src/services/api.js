const API_KEY = "d61a30d57750a7b03e7ea2a010c1af05"; 
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
export const getMovieVideos = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
  };
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const getMovieReviews = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
