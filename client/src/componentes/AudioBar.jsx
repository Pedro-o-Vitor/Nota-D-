import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AudioBar() {
  const { track, isPlaying, progress, playTrack, pause } = usePlayer();
  const navigate = useNavigate();

  // if (!track) return null;

  return (
    <div style={styles.bar}>
      {track ? (
        <div
          style={styles.clickableInfo}
          onClick={() => navigate(`/track/${track.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/track/${track.id}`);
            }
          }}
        >
          <img
            src={track.album.cover_small}
            alt={track.title}
            style={styles.cover}
          />
          <div style={styles.info}>
            <span style={styles.title}>{track.title}</span>
            <span style={styles.artist}>{track.artist.name}</span>
          </div>
        </div>
      ) : null}
      <div style={{display: "flex", float: "right", width: "100%", justifyContent: "flex-end", alignItems: "center"}}>
      <button
        onClick={() => (isPlaying ? pause() : playTrack(track))}
        style={styles.button}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progress, width: `${progress}%` }} > </div>
      </div>
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
    backgroundColor: "#1E1E1E",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
    gap: "1rem",
    zIndex: 1000,
  },
  clickableInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
    outline: "none",
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
    padding: "0 1rem",
    margin: "0px 0 0px 15px"
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#1db954",
  },
};
