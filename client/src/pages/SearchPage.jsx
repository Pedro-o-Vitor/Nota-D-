import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TrackCard from "../componentes/TrackCard";
import Header from "../componentes/Header";

export default function SearchPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await axios.get(`/api/search/${query}`);
        setTracks(response.data.data);
      } catch (error) {
        console.error("Erro na busca:", error);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <>
      <Header />
      <div style={{backgroundColor: "#181818", display: "flex", flexDirection: "column"}}>
        <h2 style={{ marginLeft: "7rem", width: "50%" }} >Resultados para: {query}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onClick={() => navigate(`/track/${track.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
