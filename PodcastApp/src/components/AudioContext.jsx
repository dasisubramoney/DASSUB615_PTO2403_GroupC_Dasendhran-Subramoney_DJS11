import { createContext, useContext, useState, useRef } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const playAudio = (episode) => {
    if (currentEpisode?.url !== episode.url) {
      audioRef.current.src = episode.url;
      audioRef.current.play();
      setCurrentEpisode(episode);
      setIsPlaying(true);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, isPlaying, currentEpisode }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);