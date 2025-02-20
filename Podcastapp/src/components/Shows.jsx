import React from 'react';
import { useState, useEffect } from "react"; // Import React hooks

const Shows = () => {
  const [status, setStatus] = useState(); // State to store API status message
  const [shows, setShows] = useState([]); // Store posts in state

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Async function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        // Fetch data from the JSONPlaceholder API
        const response = await fetch("https://podcast-api.netlify.app");
        // Check if the response is successful
        if (response.ok) {
          const data = await response.json(); // Convert response to JSON
          console.log("Fetched Data:", data); // Log data for debugging
          setShows(data); // Store the fetched posts in state
          setStatus("API is working!"); // Set success status
        } else {
          setStatus("API is down!"); // Set error status if API fails
        }
      } catch (error) {
        setStatus("API request failed!"); // Handle network errors
      }
    };

    fetchPosts(); // Call the fetch function when the component mounts
  }, []); // Runs once when the component mounts

  // Sort the shows alphabetically by title before mapping
  const sortedShows = shows.sort((a, b) => {
    if (a.title < b.title) return -1; // If a.title comes before b.title, return -1
    if (a.title > b.title) return 1;  // If a.title comes after b.title, return 1
    return 0; // If titles are equal, return 0
  });

  const ShowElements = sortedShows.map(show => (
    <div key={show.id} className="van-tile">
        <img src={show.image} />
        <div className="van-info">
            <h3>{show.title}</h3>
            <p>{show.description}<span>/day</span></p>
        </div>
    </div>
))

  return (
    <div>

        <div className="van-list-container">
            <h1>Explore our shows</h1>
            <div className="van-list">
                {ShowElements}
            </div>
        </div>
       
    </div>
  );
};

export default Shows; // Export the component for use in other parts of the app