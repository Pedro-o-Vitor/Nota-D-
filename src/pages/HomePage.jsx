import { useEffect, useState } from "react";
import MusicCarousel from "../componentes/MusicCarousel";


export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <div style={style.container} >
      <h1>Bem-vindo, {username}!</h1>
      <p>Explore as melhores músicas do momento 🎶</p>
      <MusicCarousel />
    </div>
  );
}

const style = {
  container: {
    padding: "2rem",
    backgroundColor: "#1E1E1E",
    color: "#fff",
    minHeight: "100vh"
  }
};