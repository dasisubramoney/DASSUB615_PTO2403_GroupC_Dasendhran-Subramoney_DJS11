import React from 'react';
import { useNavigate } from "react-router-dom";
import Shows from './Shows';

const Genres = () => {
  
  const navigate = useNavigate();
  
      // Genre data
      const genres = [
          { id: 1, title: "Personal Growth" },
          { id: 2, title: "Investigative Journalism" },
          { id: 3, title: "History" },
          { id: 4, title: "Comedy" },
          { id: 5, title: "Entertainment" },
          { id: 6, title: "Business" },
          { id: 7, title: "Fiction" },
          { id: 8, title: "News" },
          { id: 9, title: "Kids and Family" },
      ];
  
      // Handle genre button click
      const handleGenreClick = (genresId) => {
        console.log('Clicked genre ID:', genresId); // Debugging: Log the genre ID
          navigate(`/genres/${genresId}`); // Navigate to the genre's page
      };

  return (
          <div>
            <h1>Genres</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
                    >
                        {genre.title}
                    </button>
                ))}
            </div>
            <Shows />
        </div>
  );
};

export default Genres;