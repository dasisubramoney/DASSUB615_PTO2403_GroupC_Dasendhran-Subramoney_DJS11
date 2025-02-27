import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { sortByTitleAZ, sortByTitleZA, sortByMostRecentUpdate, sortByLeastRecentUpdate } from "./Functions";

const Favorites = () => {
  const navigate = useNavigate();

    // Retrieve favorites from localStorage
    const getFavorites = () => {
        const favorites = localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
    };

    const [favorites, setFavorites] = useState(getFavorites()); // Reactive favorites state
    const [sortedFavorites, setSortedFavorites] = useState(favorites);

    // Update sortedFavorites when favorites changes
    useEffect(() => {
            setSortedFavorites([...favorites]);
    }, [favorites]);

    // Sorting handlers
    const handleSortByTitleAZ = () => {
        setSortedFavorites(sortByTitleAZ([...favorites]));
    };

    const handleSortByTitleZA = () => {
        setSortedFavorites(sortByTitleZA([...favorites]));
    };

    const handleSortByMostRecentUpdate = () => {
        setSortedFavorites(sortByMostRecentUpdate([...favorites]));
    };

    const handleSortByLeastRecentUpdate = () => {
        setSortedFavorites(sortByLeastRecentUpdate([...favorites]));
    };

    // Handle back button click
    const handleBack = () => {
        navigate("/shows");
    };

    // Handle remove from favorites
    const removeFromFavorites = (id, season, episode) => {
        const updatedFavorites = favorites.filter((fav) =>!(fav.id === id &&fav.season === season &&fav.episode === episode) );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites); // Update favorites state to trigger re-render
    };

    // Format the timestamp
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "Date not available";
      const date = new Date(timestamp);
      return date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
      });
    };


  return (
        <div>
          {/* Back Button */}
          <button onClick={handleBack} style={{ marginBottom: "20px" }}>
              Back to Shows
          </button>

          <h1>Your Favorites</h1>

          {/* Sorting Buttons */}
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <button onClick={handleSortByTitleAZ}>Sort by Title (A-Z)</button>
                <button onClick={handleSortByTitleZA}>Sort by Title (Z-A)</button>
                <button onClick={handleSortByMostRecentUpdate}>Most Recently Updated</button>
                <button onClick={handleSortByLeastRecentUpdate}>Least Recently Updated</button>
            </div>

          {favorites.length === 0 ? (
              <p>No favorites added yet.</p>
          ) : (
              <div className="van-list">
                  {sortedFavorites.map((fav, index) => (
                      <div key={index} className="van-tile">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                                <img src={fav.seasonImage} alt={fav.title} style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }} />
                                <h3>{fav.title}</h3>
                            </div>
                          <p>Season: {fav.season}</p>
                          <p>Episode: {fav.episode}</p>
                          <p>Episode Title: {fav.episodeTitle}</p>
                          <p>Added on: {formatTimestamp(fav.addedAt)}</p> {/* Display timestamp */}

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