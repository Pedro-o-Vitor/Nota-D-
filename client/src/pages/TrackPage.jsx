import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TrackPage() {
  const { id } = useParams(); // pega o id da URL
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [lyrics, setLyrics] = useState("");

  const handleGoBack = () => {
    navigate("/home");
  };

  // 🎶 Buscar detalhes da música
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

  // 📝 Buscar letra da música
  useEffect(() => {
    const fetchLyrics = async () => {
      if (track?.title && track?.artist?.name) {
        try {
          const response = await axios.get(
            `https://api.lyrics.ovh/v1/${track.artist.name}/${track.title}`
          );
          setLyrics(response.data.lyrics);
        } catch (error) {
          setLyrics("Letra não encontrada.");
        }
      }
    };
    fetchLyrics();
  }, [track]);

  if (!track) {
    return <p style={{ color: "white" }}>Carregando música...</p>;
  }

  return (
    <main style={styles.main}>
      <button onClick={handleGoBack} style={styles.backButton}>
        ⬅ Voltar para Home
      </button>

      <div style={styles.container}>
        <img src={track.album.cover_medium} alt="Capa do álbum" style={styles.cover} />
        <div>
          <h1>{track.title}</h1>
          <h2>{track.artist.name}</h2>
        </div>
      </div>


      <div style={styles.lyricsBox}>
        <h3>Letra</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{lyrics}</pre>
      </div>
    </main>
  );
}

const styles = {
  main: {
    padding: "20px",
    color: "white",
    display: "grid",
    justifyContent: "center",
  },
  backButton: {
    marginBottom: "15px",
    padding: "8px 16px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  cover: {
    width: "200px",
    borderRadius: "10px",
  },
  audio: {
    marginTop: "20px",
    width: "100%",
  },
  lyricsBox: {
    background: "#222",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "50px",
  },
};
