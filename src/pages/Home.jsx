import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies, getPopularMovies, getMovieVideos } from "../services/api";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import "../css/Home.css";

function Home() {
const location = useLocation();
const [searchQuery, setSearchQuery] = useState("");
const [movies, setMovies] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [featuredMovie, setFeaturedMovie] = useState(null);
const [showTrailer, setShowTrailer] = useState(false);
const [trailerKey, setTrailerKey] = useState(null);

// Parse search param from URL
useEffect(() => {
const params = new URLSearchParams(location.search);
const query = params.get("search") || "";
setSearchQuery(query);


if (query.trim()) {
  performSearch(query);
} else {
  loadPopularMovies();
}
}, [location.search]);

const loadPopularMovies = async () => {
setLoading(true);
try {
const popularMovies = await getPopularMovies();
setMovies(popularMovies);
if (popularMovies.length > 0) {
setFeaturedMovie(popularMovies[0]);
}
setError(null);
} catch (err) {
console.log(err);
setError("Failed to load movies...");
} finally {
setLoading(false);
}
};

const performSearch = async (query) => {
setLoading(true);
try {
const searchResults = await searchMovies(query);
setMovies(searchResults);
setError(null);
if (searchResults.length > 0) {
setFeaturedMovie(searchResults[0]);
}
} catch (err) {
console.log(err);
setError("Failed to search movies...");
} finally {
setLoading(false);
}
};

const handleSearch = async (e) => {
e.preventDefault();
if (!searchQuery.trim()) return;
if (loading) return;


performSearch(searchQuery);
};

const handleShowTrailer = async () => {
if (!featuredMovie) return;
try {
const videos = await getMovieVideos(featuredMovie.id);
const youtubeTrailer = videos.find(
(video) => video.site === "YouTube" && video.type === "Trailer"
);
if (youtubeTrailer) {
setTrailerKey(youtubeTrailer.key);
setShowTrailer(true);
} else {
alert("No trailer available for this movie.");
}
} catch (err) {
console.error(err);
alert("Failed to load trailer.");
}
};

const closeTrailer = () => {
setShowTrailer(false);
setTrailerKey(null);
};

return (

<>
  {error && <div className="error-message">{error}</div>}

  {loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <>
      {featuredMovie && <HeroBanner movie={featuredMovie} />}
      <div className="movies-row">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  )}
</>
)}

export default Home;