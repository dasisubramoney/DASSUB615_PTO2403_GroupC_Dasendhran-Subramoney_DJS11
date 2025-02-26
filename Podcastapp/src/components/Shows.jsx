import React from 'react';
import { useState, useEffect } from "react"; // Import React hooks
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"

const Shows = () => {
  const [status, setStatus] = useState(); // State to store API status message
  const [shows, setShows] = useState([]); // Store posts in state
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

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
        } finally {
          setIsLoading(false); // Set loading to false when the fetch is complete (success or error)
        }
    };

    fetchPosts(); // Call the fetch function when the component mounts
  }, []); // Runs once when the component mounts

  // Sort the shows alphabetically by title before mapping
  const sortedShows = shows.sort((a,b) => {
    if (a.title < b.title) return -1; // If a.title comes before b.title, return -1
    if (a.title > b.title) return 1;  // If a.title comes after b.title, return 1
    return 0; // If titles are equal, return 0
  });

   // Helper function to truncate the description to a certain number of words
   const truncateDescription = (text, wordLimit) => {
    const words = text.split(" "); // Split the text into an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...READ MORE"; // Join the first 'wordLimit' words and add ellipsis
    }
    return text; // Return the original text if it's within the limit
  };

   // Function to format the last updated date
   const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the ISO 8601 date string
    return date.toLocaleDateString("en-US", { // Format the date
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const ShowElements = sortedShows.map(show => (
    <div key={show.id} className="van-tile">
      <Link to={`/ShowDetail/${show.id}`}> {/* Link to the show detail page */}
        <img src={show.image} />
        <div className="van-info">
            <h3>{show.title}</h3>
            <p>{truncateDescription(show.description, 10)}</p>
            <p>Seasons: {show.seasons}</p>
            {/* Display the last updated date */}
            <p style={{ fontSize: "14px", color: "black", marginTop: "8px" }}>
              Last updated: {formatDate(show.updated)}
            </p>
        </div>
      </Link>
    </div>
  ))

  return (
    <div>

        <div className="van-list-container">
            <h1>Explore our shows</h1>

            {isLoading ? ( // Display loading message if data is still being fetched
              <p>Loading shows...</p>
            ) : (
              <div className="van-list">
                {ShowElements}
              </div> )}
        </div>
       
    </div>
  );
};

export default Shows; // Export the component for use in other parts of the app