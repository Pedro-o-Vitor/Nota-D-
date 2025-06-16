
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { useState } from "react";

export default function TrackCard({ track }) {
  const { playTrack, pause, isPlaying } = usePlayer();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/track/${track.id}`);
  };

  const hoverStyle = isHovered
    ? {
        transform: "scale(1.05)",
        boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)",
        zIndex: 10,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }
    : {
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      };

  return (
    <div
      onClick={() => {
        playTrack(track);
        handleClick();
      }}
      style={{ ...styles.card, ...hoverStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={track.album.cover_medium} alt={track.title} style={styles.image} />
      <p>{track.title}</p>
    </div>
  );
}

const styles = {
  button:{
    borderRadius: "50%",
    padding: "1px",
  },
  card: {
    cursor: "pointer",
    padding: "1rem",
    backgroundColor: "#181818",
    textAlign: "center",
    color: "white",
    fontFamily: "Arial",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "15rem",
    height: "18rem",
    minHeight: "20rem",
    alignItems: "center"
  },
  image: {
    width: "100%",
    borderRadius: "8px"
  }
};