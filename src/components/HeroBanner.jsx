import React from "react";
import "../css/HeroBanner.css";

function HeroBanner({ movie }) {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-overview">{movie.overview}</p>
        <div className="hero-buttons">
          <button className="play-button">Play</button>
          <button className="info-button">More Info</button>
        </div>
      </div>
      <div className="hero-fade-bottom" />
    </div>
  );
}

export default HeroBanner;
