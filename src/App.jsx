import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { UserProvider, useUserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar";

function PrivateRoute({ children }) {
  const { user } = useUserContext();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <MovieDetails />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
