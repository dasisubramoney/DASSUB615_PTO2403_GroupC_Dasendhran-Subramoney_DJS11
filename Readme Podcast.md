# Podcast App - Ultimate Podcasting Adventure
Welcome to the Podcast App, your ultimate podcasting adventure! This project is designed to showcase your creativity and technical skills by building a sleek, user-friendly podcast app using React. Whether you're a comedy connoisseur or a history buff, this app has something for everyone. Dive into the world of podcasts, explore your favorite shows, and enhance your development skills with this exciting project.

# Table of Contents

1-Introduction
2-Features
3-Technology Stack
4-Data Structure
5-API Endpoints
6-Genre Titles
7-User Stories
8-Setup Instructions
9-Usage Examples
10-Deployment
11-Contact Information

# 1-Introduction
The Podcast App is a React-based application that allows users to explore and listen to their favorite podcasts. The app fetches data from a provided API, organizes it into shows, seasons, and episodes, and provides a seamless user experience with features like sorting, filtering, and favoriting episodes. This project is designed to be a comprehensive portfolio piece, demonstrating your ability to work with React, manage state, and create a polished user interface.

# 2-Features
 
-Show Listings: Browse through a list of podcast shows with preview images and descriptions.

-Season and Episode Views: Dive into specific seasons and episodes of a show.

-Audio Player: Listen to episodes directly within the app.

-Favorites: Mark episodes as favorites and manage them in a dedicated section.

-Sorting and Filtering: Sort shows by genre, title, or other criteria.

-Responsive Design: The app is fully responsive and works seamlessly across devices.

-Persistent Data: Favorites and playback progress are saved using localStorage.

# 3-Technology Stack
    -Frontend: React
    -State Management: React Context API or Redux (optional)
    -Styling: CSS or a library like TailwindCSS
    -Build Tool: Vite or Create React App
    -Deployment: Netlify
    -Optional: TypeScript for type safety

# 4-Data Structure
The data for the app is organized into three main units:

SHOW: Represents a specific podcast with one or more seasons.
SEASON: A collection of episodes released over a specific timespan.
EPISODE: Represents a specific MP3 file #that users can listen to.

Additional data units include:
PREVIEW: A summarized version of a SHOW, used for listing multiple shows.
GENRE: Information about the genre of a SHOW.

# 5-API Endpoints
-The app fetches data from the following API endpoints:
-Base URL: https://podcast-api.netlify.app
-Endpoints:
-GET /: Returns an array of PREVIEW objects.
-GET /genre/<ID>: Returns a GENRE object.
-GET /id/<ID>: Returns a SHOW object with SEASON and EPISODE details.

# 6-Genre Titles
The following genre IDs map to specific titles:

ID	Genre Title
1	Personal Growth
2	Investigative Journalism
3	History
4	Comedy
5	Entertainment
6	Business
7	Fiction
8	News
9	Kids and Family

# 7-User Stories
Core Project Requirements
Setup and Deployment:
    -Deploy the app to Netlify.
    -Add a custom favicon and metatags for SEO.

UI/UX:
    -Display show names, preview images, and descriptions.
    -Allow users to view seasons and episodes.
    -Implement an audio player for listening to episodes.

Data Fetching and State Management:
    -Fetch data from the API and manage loading states.
    -Allow users to mark episodes as favorites.
    -Persist favorites and playback progress using localStorage.

User Interaction:
    -Provide sorting and filtering options for shows.
    -Ensure the audio player is visible and functional across pages.

Overall Assessment:
    -Ensure the app has a good appearance and is easy to navigate.
    -Maintain a clear commit history and write clean, bug-free code.
    -Include a comprehensive README file.

# 8-Setup Instructions
Clone the Repository:
    git clone https://github.com/your-username/podcast-app.git
    cd podcast-app

Install Dependencies:
    npm install

Run the Development Server:
    npm run dev

Build for Production:
    npm run build

Deploy to Netlify:
    Push your code to GitHub.
    Connect your GitHub repository to Netlify and deploy the app.

# 9-Usage Examples
Fetching Shows:

const fetchShows = async () => {
    const response = await fetch("https://podcast-api.netlify.app/");
    const data = await response.json();
    return data;
};

Fetching a Specific Show:

const fetchShowById = async (id) => {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();
    return data;
};

Marking an Episode as Favorite:

const addToFavorites = (episode) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(episode);
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

# 10-Deployment:
The app is deployed on Netlify. You can access it here:
Podcast App Live Demo https://dasendhranspodcasts.netlify.app/  

# 11-Contact Information
If you have any questions or need assistance, feel free to reach out to your coaches or contact the project maintainer:

Name: Dasendhran Subramoney

Email: das.subramoney@gmail.com

GitHub: https://github.com/dasisubramoney

