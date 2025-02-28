import { createContext, useContext, useState, useRef } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const audioRef = useRef(new Audio());

  const playAudio = (trackUrl) => {
    if (currentTrack !== trackUrl) {
      audioRef.current.src = trackUrl;
      audioRef.current.play();
      setCurrentTrack(trackUrl);
      setIsPlaying(true);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
    setIsMinimized(false); // Show player when audio starts
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ 
      playAudio, pauseAudio, isPlaying, currentTrack, 
      isMinimized, setIsMinimized, audioRef 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);