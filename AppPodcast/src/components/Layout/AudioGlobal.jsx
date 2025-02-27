import React from "react";
import { useAudio } from "./AudioContext"; // Adjust the path as needed

export default function GlobalAudioPlayer() {
    const { audioState } = useAudio();

    if (!audioState.currentEpisode) {
        return null; // Don't render anything if no episode is selected
    }

    return (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: "10px", boxShadow: "0 -2px 10px rgba(0,0,0,0.1)" }}>
            <h4>Now Playing: {audioState.currentEpisode.title}</h4>
            <audio
                controls
                src={audioState.currentEpisode.file}
                autoPlay={audioState.isPlaying}
            >
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}