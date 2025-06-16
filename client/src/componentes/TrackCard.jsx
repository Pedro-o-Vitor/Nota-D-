import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function TrackCard({ track }) {
  const { playTrack, pause, isPlaying } = usePlayer();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/track/${track.id}`);
  };

  return (

    <div onClick={() => { playTrack(track); handleClick(); }} style={styles.card}>
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
    backgroundColor: "Black",
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