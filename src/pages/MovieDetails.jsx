import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieReviews, getMovieVideos } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        const reviewsData = await getMovieReviews(id);
        setReviews(reviewsData);
        const videosData = await getMovieVideos(id);
        setVideos(videosData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const youtubeVideos = videos.filter(
    (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Clip")
  );

  const handleShowTrailer = () => {
    if (youtubeVideos.length > 0) {
      setTrailerKey(youtubeVideos[0].key);
      setShowTrailer(true);
    } else {
      alert("No trailer available for this movie.");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerKey(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  // Calculate total watch time if available
  const totalWatchTime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

  return (
    <div className="movie-details" style={{ padding: "1rem", color: "white", backgroundColor: "#111", position: "relative" }}>
      <button
        onClick={handleBack}
        style={{
          position: "absolute",
          top: "4rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          backgroundColor: "#444",
          border: "none",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          zIndex: 0,
        }}
      >
        To Previous</button>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "8px",minWidth:"650px",maxHeight:"400px", marginBottom: "1rem" }}
      />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Rating:</strong> {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
      <p><strong>Total Watch Time:</strong> {totalWatchTime}</p>

      <button onClick={handleShowTrailer} style={{ padding: "0.5rem 1rem", cursor: "pointer", marginTop: "1rem" }}>
        Watch Trailer
      </button>

      {showTrailer && trailerKey && (
        <div
          className="trailer-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeTrailer}
        >
          <iframe
            width="80%"
            height="80%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onClick={(e) => e.stopPropagation()}
          ></iframe>
        </div>
      )}

      <button
        onClick={() => setShowReviews(true)}
        style={{ padding: "0.5rem 1rem", cursor: "pointer", marginTop: "1rem" }}
      >
        View Reviews
      </button>

      {showReviews && (
        <section className="reviews" style={{ marginTop: "2rem" }}>
          <h3>Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review" style={{ marginBottom: "1rem", borderBottom: "1px solid #444", paddingBottom: "1rem" }}>
                <p><strong>{review.author}</strong> says:</p>
                <p>{review.content}</p>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}

export default MovieDetails;
