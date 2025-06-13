import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Quando muda a track, troca a src do áudio
  const playTrack = (newTrack) => {
    if (!newTrack) return;
    if (track?.preview !== newTrack.preview) {
      audioRef.current.src = newTrack.preview;
      setTrack(newTrack);
    }
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(console.error);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Atualiza progresso
  audioRef.current.ontimeupdate = () => {
    const t = audioRef.current;
    setProgress((t.currentTime / t.duration) * 100 || 0);
  };

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        progress,
        playTrack,
        pause,
        audioRef
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
