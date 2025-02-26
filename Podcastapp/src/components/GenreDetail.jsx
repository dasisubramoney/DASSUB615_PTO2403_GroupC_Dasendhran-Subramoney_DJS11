import React from "react";
import { useParams, Link } from "react-router-dom";

export default function GenreDetail() {
  const { genresId } = useParams(); // Get the genre ID from the URL
  const [genreData, setGenreData] = React.useState(null); // Store genre data
  const [show, setShow] = React.useState([]); // Store show details
  const [shows, setShows] = React.useState([]); // Store matched show details
  const [isLoading, setIsLoading] = React.useState(true); // Track loading state
  const [status, setStatus] = React.useState(""); // Track status for debugging

  // Fetch genre data and associated shows
  React.useEffect(() => {
    const fetchGenreData = async () => {
      try {
        // Fetch all shows data from the API
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error("Failed to fetch shows data");
        }
        const data = await response.json(); // Convert response to JSON
        console.log("Fetched Shows Data:", data); // Log data for debugging
        setShow(data); // Store the fetched shows in state

        // Fetch genre data
        const genreResponse = await fetch(`https://podcast-api.netlify.app/genre/${genresId}`);
        if (!genreResponse.ok) {
          throw new Error("Failed to fetch genre data");
        }
        const genreData = await genreResponse.json();
        console.log("Fetched Genre Data:", genreData); // Log genre data for debugging
        setGenreData(genreData);

        // Extract the show IDs from genreData
        const showIds = genreData.shows;
        console.log("Show IDs from Genre:", showIds); // Log show IDs for debugging

        // Match show IDs to the shows data
        const matchedShows = showIds.map((showId) => {
          return data.find((show) => show.id === showId);
        });

        // Filter out any undefined values (in case a show ID doesn't match)
        const validShows = matchedShows.filter((show) => show !== undefined);
        console.log("Valid Shows:", validShows); // Log valid shows for debugging

        setShows(validShows);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus("API is down!"); // Set error status if API fails
      } finally {
        setIsLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchGenreData();
  }, [genresId]);

  // Helper function to truncate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const ShowElement = shows.map((showItem) => (
    <div key={showItem.id} className="van-tile">
      <Link to={`/ShowDetail/${showItem.id}`}>
        {/* Link to the show detail page */}
        <img src={showItem.image} alt={showItem.title} />
        <div className="van-info">
          <h3>{showItem.title}</h3>
          <p>{truncateDescription(showItem.description, 10)}</p>
          <p>Seasons: {showItem.seasons}</p>
          {/* Display the last updated date */}
          <p style={{ fontSize: "14px", color: "black", marginTop: "8px" }}>
            Last updated: {formatDate(showItem.updated)}
          </p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      {/* Only render genreData.title if genreData is not null */}
      {genreData && (
        <>
          <h1>{genreData.title}</h1>
          <p>{genreData.description}</p>
        </>
      )}

      <h2>Shows in this Genre {genresId}</h2>

      <div className="van-list-container">
        <h1>Explore our shows</h1>

        {isLoading ? ( // Display loading message if data is still being fetched
          <p>Loading shows...</p>
        ) : shows.length > 0 ? ( // Check if there are valid shows
          <div className="van-list">{ShowElement}</div>
        ) : (
          <p>No shows found for this genre.</p> // Display if no shows are found
        )}
      </div>
    </div>
  );
}