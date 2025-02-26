import React from 'react';
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();

    // Retrieve favorites from localStorage
    const getFavorites = () => {
        const favorites = localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
    };

    const favorites = getFavorites();

    // Handle back button click
    const handleBack = () => {
        navigate("/shows");
    };

    // Handle remove from favorites
    const removeFromFavorites = (id, season, episode) => {
        const updatedFavorites = favorites.filter(
            (fav) =>
                !(
                    fav.id === id &&
                    fav.season === season &&
                    fav.episode === episode
                )
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        window.location.reload(); // Refresh the page to reflect changes
    };


  return (
        <div>
          {/* Back Button */}
          <button onClick={handleBack} style={{ marginBottom: "20px" }}>
              Back to Shows
          </button>

          <h1>Your Favorites</h1>

          {favorites.length === 0 ? (
              <p>No favorites added yet.</p>
          ) : (
              <div>
                  {favorites.map((fav, index) => (
                      <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                          <h3>{fav.title}</h3>
                          <p>Season: {fav.season}</p>
                          <p>Episode: {fav.episode}</p>
                          <p>Episode Title: {fav.episodeTitle}</p>
                          <button
                              onClick={() =>
                                  removeFromFavorites(fav.id, fav.season, fav.episode)
                              }
                              style={{ marginTop: "10px" }}
                          >
                              Remove from Favorites
                          </button>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
};

export default Favorites;