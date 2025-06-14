import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TrackPage() {
  const { id } = useParams(); // pega o id da URL
  const [track, setTrack] = useState(null);

  const navigate = useNavigate();

  const handleGoBack = () => {
  navigate("/home");
};

  const [lyrics, setLyrics] = useState("");

useEffect(() => {
  const fetchLyrics = async () => {
    try {
      const response = await axios.get(
        `https://api.lyrics.ovh/v1/${track.artist.name}/${track.title}`
      );
      setLyrics(response.data.lyrics);
    } catch (error) {
      setLyrics("Letra não encontrada.");
    }
  };

  if (track?.title && track?.artist?.name) {
    fetchLyrics();
  }
}, [track]);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`/api/track/${id}`);
        setTrack(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da música:", error);
      }
    };

    fetchTrack();
  }, [id]);

  if (!track) {
    return <p style={{ color: "white" }}>Carregando música...</p>;
  }

  return (
  <main>
    <div style={styles.container}>
      <h1>{track.title}</h1>
      <h2>{track.artist.name}</h2>
      <img src={track.album.cover_medium} alt="Capa do álbum" style={styles.cover} />
    </div>
    <div style={styles.letra}>
    <h3>Letra</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</pre>
    </div>
   </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign:"center",
    width: "43%"
    [
      { 
        padding: "2rem",
        textAlign: "center",
        display: "block",
      }
    ]

  },
  cover: {
    width: "20rem",
    borderRadius: "10px",
    margin: "1rem 0"
  },
  audio: {
    marginTop: "1rem"
  },
   letra: {
    padding: "2rem",
    color: "#fff",
    minHeight: "100vh",
    textAlign: "center",
    width: "45%"
    [
      { 
        padding: "2rem",
        textAlign: "center",
        display: "block",
      }
    ]
  }
};