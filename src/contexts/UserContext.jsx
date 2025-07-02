import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedWatched = localStorage.getItem("watchedMovies");
    const storedRecent = localStorage.getItem("recentlyWatched");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedWatched) setWatchedMovies(JSON.parse(storedWatched));
    if (storedRecent) setRecentlyWatched(JSON.parse(storedRecent));
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  useEffect(() => {
    localStorage.setItem("recentlyWatched", JSON.stringify(recentlyWatched));
  }, [recentlyWatched]);

  const login = (userData) => {
    setUser(userData);
  };

  const setProfilePicture = (profilePicture) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePicture };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logout = () => {
    setUser(null);
    setWatchedMovies([]);
    setRecentlyWatched([]);
    localStorage.removeItem("user");
    localStorage.removeItem("watchedMovies");
    localStorage.removeItem("recentlyWatched");
  };

  const addWatchedMovie = (movie) => {
    if (!watchedMovies.find((m) => m.id === movie.id)) {
      setWatchedMovies((prev) => [...prev, movie]);
    }
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((m) => m.id !== movie.id);
      return [movie, ...filtered].slice(0, 10); // keep max 10 recent
    });
  };

  const value = {
    user,
    login,
    logout,
    watchedMovies,
    recentlyWatched,
    addWatchedMovie,
    setProfilePicture,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
