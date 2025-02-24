import React from "react";
import { useParams } from "react-router-dom";

export default function ShowDetail() {
    const params = useParams();
    const [showitem, setShow] = React.useState(null); // Initialize as null
    const [status, setStatus] = React.useState(""); // Track status for debugging
    const [isLoading, setIsLoading] = React.useState(true); // Track loading state

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

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!showitem) {
        return <div>No data available</div>; // Handle case where no data is fetched
    }


    return (
        <div>
           <h1>Explore the show {params.id} </h1>  
           <div >
                <h3>{showitem.title || "Title not available"}</h3>
                <p>{showitem.description || "Description not available"}</p>
                <p>Seasons: {showitem.seasons ? showitem.seasons.length : "No seasons available"}</p>
                <p>Last updated: {formatDate(showitem.updated)}</p>
            </div>

        </div>
    )
}