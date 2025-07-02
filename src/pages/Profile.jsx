import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useUserContext } from "../contexts/UserContext";
import "../css/Profile.css";

function Profile() {
  const { user, logout, watchedMovies, recentlyWatched, setProfilePicture } = useUserContext();
  const { favorites } = useMovieContext();

  const [preview, setPreview] = useState(user?.profilePicture || "");

  // Calculate total minutes watched (assuming movie.duration in minutes)
  const totalMinutes = watchedMovies.reduce((sum, movie) => sum + (movie.duration || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <aside className="profile-sidebar">
        <h2>User Info</h2>
        <div className="profile-user-info">
          {preview ? (
            <img src={preview} alt="Profile" style={{ width: "150px", borderRadius: "50%", marginBottom: "1rem" }} />
          ) : (
            <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#204060", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc" }}>
              No Image
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <button className="profile-logout-btn" onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="profile-main">
        <section className="profile-section">
          <h3>Watched Movies Summary</h3>
          {watchedMovies.length === 0 ? (
            <p>No watched movies yet.</p>
          ) : (
            <>
              <div className="movies-grid">
                {watchedMovies.map((movie) => (
                  <div key={movie.id} className="movie-card-summary">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p>{movie.title}</p>
                  </div>
                ))}
              </div>
              <p>Total Hours Watched: {totalHours}</p>
            </>
          )}
        </section>

        <section className="profile-section">
          <h3>Recently Watched</h3>
          {recentlyWatched.length === 0 ? (
            <p>No recently watched movies.</p>
          ) : (
            <div className="movies-grid">
              {recentlyWatched.map((movie) => (
                <div key={movie.id} className="movie-card-summary">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="profile-section">
          <h3>Favorite Movies</h3>
          {favorites.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            <div className="movies-grid">
              {favorites.map((movie) => (
                <div key={movie.id} className="movie-card-summary">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
