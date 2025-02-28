import { useAudio } from "./AudioContext";

const MiniAudioPlayer = () => {
  const { currentTrack, isPlaying, pauseAudio, playAudio, isMinimized, setIsMinimized, audioRef } = useAudio();

  if (!currentTrack) return null; // Hide if no audio is playing

  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "20px",
      background: "#222", color: "#fff", padding: "10px", borderRadius: "10px"
    }}>
      {!isMinimized && <p>Now Playing: {currentTrack}</p>}
      <button onClick={() => setIsMinimized(!isMinimized)}>
        {isMinimized ? "🔊" : "🔽"}
      </button>
      <button onClick={() => (isPlaying ? pauseAudio() : playAudio(currentTrack))}>
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
      <button onClick={() => { audioRef.current.pause(); setIsMinimized(true); }}>
        ❌ Close
      </button>
    </div>
  );
};

export default MiniAudioPlayer;