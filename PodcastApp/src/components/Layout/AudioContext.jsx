import React, { createContext, useState, useContext } from "react";

// Create a context for the audio player
const AudioContext = createContext();

// Create a provider component to wrap around your app
export const AudioProvider = ({ children }) => {
    const [audioState, setAudioState] = useState({
        isPlaying: false,
        currentEpisode: null,
        playbackProgress: 0,
    });

    // Function to update the audio state
    const updateAudioState = (newState) => {
        setAudioState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    return (
        <AudioContext.Provider value={{ audioState, updateAudioState }}>
            {children}
        </AudioContext.Provider>
    );
};

// Custom hook to use the audio context
export const useAudio = () => useContext(AudioContext);