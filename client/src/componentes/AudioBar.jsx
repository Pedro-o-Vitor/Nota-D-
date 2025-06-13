import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa"; // ou outro pacote de ícones

export default function AudioBar() {
  const { track, isPlaying, progress, playTrack, pause } = usePlayer();

  if (!track) return null; // não renderiza se não tiver nenhuma música

  return (
    <div style={styles.bar}>
      <img
        src={track.album.cover_small}
        alt={track.title}
        style={styles.cover}
      />
      <div style={styles.info}>
        <span style={styles.title}>{track.title}</span>
        <span style={styles.artist}>{track.artist.name}</span>
      </div>
      <button
        onClick={() => (isPlaying ? pause() : playTrack(track))}
        style={styles.button}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#181818",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
    gap: "1rem",
    zIndex: 1000,
  },
  cover: {
    width: "40px",
    height: "40px",
    borderRadius: "4px",
  },
  info: {
    flexGrow: 1,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  artist: {
    fontSize: "0.8rem",
    color: "#aaa",
  },
  button: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  progressContainer: {
    position: "relative",
    width: "200px",
    height: "4px",
    backgroundColor: "#404040",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#1db954",
  },
};