import React from 'react';
import { useState, useEffect } from "react"; // Import React hooks
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { sortByTitleAZ, sortByTitleZA, sortByMostRecentUpdate, sortByLeastRecentUpdate } from "./Functions";

const Shows = () => {
  const [status, setStatus] = useState(); // State to store API status message
  const [shows, setShows] = useState([]); // Store posts in state
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [sortedShows, setSortedShows] = useState([]);

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

    // Function to map genre IDs to genre titles
    const getGenreTitles = (genreIds) => {
      return genreIds
        .map((id) => genres.find((genre) => genre.id === id)?.title)
        .filter((title) => title) // Filter out undefined values
        .join(", "); // Join titles into a comma-separated string
    };

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

          // Sort the fetched data by title (A-Z) by default
          const sortedData = sortByTitleAZ(data);

          setShows(data); // Store the fetched posts in state
          setSortedShows(sortedData); // Initialize sortedShows with the fetched data
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

   // Sorting handlers
  const handleSortByTitleAZ = () => {
    setSortedShows(sortByTitleAZ([...shows])); // Sort shows by title (A-Z)
  };

  const handleSortByTitleZA = () => {
    setSortedShows(sortByTitleZA([...shows])); // Sort shows by title (Z-A)
  };

  const handleSortByMostRecentUpdate = () => {
    setSortedShows(sortByMostRecentUpdate([...shows])); // Sort shows by most recent update
  };

  const handleSortByLeastRecentUpdate = () => {
    setSortedShows(sortByLeastRecentUpdate([...shows])); // Sort shows by least recent update
  };

  const ShowElements = sortedShows.map(show => (
    <div key={show.id} className="van-tile">
      <Link to={`/ShowDetail/${show.id}`}> {/* Link to the show detail page */}
        <img src={show.image} />
        <div className="van-info">
            <h3>{show.title}</h3>
            <p>{truncateDescription(show.description, 10)}</p>
            <p>Seasons: {show.seasons}</p>
            <p style={{ fontSize: "14px", color: "black", marginTop: "8px" }}>
            Genres: {getGenreTitles(show.genres)} </p>
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

            {/* Sorting Buttons */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={handleSortByTitleAZ}>Sort by Title (A-Z)</button>
                <button onClick={handleSortByTitleZA}>Sort by Title (Z-A)</button>
                <button onClick={handleSortByMostRecentUpdate}>Most Recently Updated</button>
                <button onClick={handleSortByLeastRecentUpdate}>Least Recently Updated</button>
            </div>

             {/* Display Shows */}
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