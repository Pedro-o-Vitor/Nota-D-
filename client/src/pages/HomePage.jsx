import { useEffect, useState } from "react";
import MusicCarousel from "../componentes/MusicCarousel";
import Header from "../componentes/Header";

export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <>
      <Header />
      <div style={style.container} >
         <h2 style={style.heading}>Top Músicas Globais</h2>
        <MusicCarousel
        title="Top Músicas Globais"
        apiEndpoint="/api/chart/global"
      />
         <h2 style={style.heading}>Top Brasil</h2>
      <MusicCarousel
        title="Top Brasil"
        apiEndpoint="/api/chart/brasil"
      />
      </div>
    </>
  );
}

const style = {
  container: {
    padding: "2rem",
    backgroundColor: "black",
    color: "#fff",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.8rem"
  }
};


