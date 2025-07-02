import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import "../css/Navbar.css";

function NavBar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      // Navigate to home with search query as URL param
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Close search bar if route changes and search bar is open
  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="netflix-logo">
            Netflix
          </Link>
        </div>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/favorites" className="nav-link">
                My List
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button className="nav-link logout-button" onClick={handleLogout}>
                Logout
              </button>
              <button
                className="nav-link search-icon-button"
                onClick={toggleSearch}
                aria-label="Toggle Search"
              >
                🔍
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
      {showSearch && (
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            autoFocus
          />
          <button
            type="submit"
            className="navbar-search-button"
            disabled={loading}
          >
            Search
          </button>
        </form>
      )}
    </>
  );
}

export default NavBar;
