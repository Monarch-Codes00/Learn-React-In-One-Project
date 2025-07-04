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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
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
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Close search bar and menu if route changes and search bar is open
  useEffect(() => {
    setShowSearch(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="netflix-logo">
            Netflix
          </Link>
        </div>
        <button
          className={`hamburger-menu${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-links${menuOpen ? " open" : ""}`}>
          {user ? (
            <>
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/favorites" className="nav-link" onClick={() => setMenuOpen(false)}>
                My List
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button className="nav-link logout-button" onClick={() => {handleLogout(); setMenuOpen(false);}}>
                Logout
              </button>
              <button
                className="nav-link search-icon-button"
                onClick={() => {toggleSearch(); setMenuOpen(false);}}
                aria-label="Toggle Search"
              >
                🔍
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
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
