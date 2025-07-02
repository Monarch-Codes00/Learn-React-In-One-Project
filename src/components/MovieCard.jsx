import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useUserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const { addWatchedMovie } = useUserContext()
    const favorite = isFavorite(movie.id)
    const navigate = useNavigate();

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    function onWatchedClick(e) {
        e.preventDefault()
        addWatchedMovie(movie)
    }

    function onCardClick() {
        navigate(`/movie/${movie.id}`);
    }

    return <div className="movie-card" onClick={onCardClick} style={{ cursor: "pointer" }}>
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
                <button className="watched-btn" onClick={onWatchedClick}>
                    Mark as Watched
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard;
