import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ShowDetail() {
    const params = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [showitem, setShow] = React.useState(null); // Initialize as null
    const [status, setStatus] = React.useState(""); // Track status for debugging
    const [isLoading, setIsLoading] = React.useState(true); // Track loading state
    const [selectedSeason, setSelectedSeason] = React.useState(null); // Track selected season
    const [selectedEpisode, setSelectedEpisode] = React.useState(null); // Track selected episode

    React.useEffect(() => {
        // Async function to fetch posts from the API
        const fetchPosts = async () => {
            try {
                // Fetch data from the JSONPlaceholder API
                const response = await fetch(`https://podcast-api.netlify.app/id/${params.id}`);
                // Check if the response is successful
                if (response.ok) {
                    const data = await response.json(); // Convert response to JSON
                    console.log("Fetched Data:", data); // Log data for debugging
                    setShow(data); // Store the fetched data directly in state
                    setStatus("API is working!"); // Set success status
                } else {
                    setStatus("API is down!"); // Set error status if API fails
                    console.log("API is down!"); // Log data for debugging
                }
            } catch (error) {
                setStatus("API request failed!"); // Handle network errors
            } finally {
                setIsLoading(false); // Set loading to false when the fetch is complete (success or error)
            }
        };

        fetchPosts(); // Call the fetch function when the component mounts
    }, [params.id]);

    // Function to format the last updated date
    const formatDate = (dateString) => {
        if (!dateString) return "Date not available"; // Handle missing date
        const date = new Date(dateString); // Parse the ISO 8601 date string
        return date.toLocaleDateString("en-US", {
            // Format the date
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Handle season selection
    const handleSeasonChange = (event) => {
        const seasonIndex = event.target.value;
        setSelectedSeason(showitem.seasons[seasonIndex]);
        setSelectedEpisode(null); // Reset selected episode when season changes
    };

    // Handle episode selection
    const handleEpisodeChange = (event) => {
        const episodeIndex = event.target.value;
        setSelectedEpisode(selectedSeason.episodes[episodeIndex]);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!showitem) {
        return <div>No data available</div>; // Handle case where no data is fetched
    }

    // Handle back button click
    const handleBack = () => {
        navigate( `/shows`); // Navigate back to the shows page
    };

    return (
        <div>
            {/* Back Button */}
            <button onClick={handleBack} style={{ marginBottom: "20px" }}>
                Back to Shows
            </button>

           <h1>Explore the show {params.id} </h1>  
           <div >
                <h3>{showitem.title || "Title not available"}</h3>
                <p>{showitem.description || "Description not available"}</p>
                <p>Seasons: {showitem.seasons ? showitem.seasons.length : "No seasons available"}</p>
                <p>Last updated: {formatDate(showitem.updated)}</p>
            </div>

            {/* Season Dropdown */}
            <div>
                <label htmlFor="season-select">Select a season: </label>
                <select id="season-select" onChange={handleSeasonChange}>
                    <option value="">-- Choose a season --</option>
                    {showitem.seasons.map((season, index) => (
                        <option key={season.season} value={index}>
                            {season.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Episode Dropdown (only shown if a season is selected) */}
            {selectedSeason && (
                <div>
                    <label htmlFor="episode-select">Select an episode: </label>
                    <select id="episode-select" onChange={handleEpisodeChange}>
                        <option value="">-- Choose an episode --</option>
                        {selectedSeason.episodes.map((episode, index) => (
                            <option key={episode.episode} value={index}>
                                {episode.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Audio Player (only shown if an episode is selected) */}
            {selectedEpisode && (
                <div>
                    <h4>Now Playing: {selectedEpisode.title}</h4>
                    <audio controls>
                        <source src={selectedEpisode.file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <p>{selectedEpisode.description}</p>
                </div>
            )}

        </div>
    )
}