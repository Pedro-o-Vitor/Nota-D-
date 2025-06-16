import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search/${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <header style={styles.Header}>
      <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        Nota 
        Dó 
      </h1>
      <form onSubmit={handleSubmit} className="search-form" style={styles.form}>
        <input
          type="text"
          placeholder="Buscar música ou artista..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Buscar</button>
      </form>
    </header>
  );
}

const styles = {
  Header: {
    padding: "20px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  h1: {
    display: "flex", 
    justifyContent: "flex-start",
     alignItems: "center",
      padding: "20px",  
  },

  form: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#000000",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: "600px",
    margin: "20px",
  },
  input: {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: "20p",
    border: "4px solid #ccc",
    outline: "none",
    width: "50%",
    maxWidth: "400px",
    justifyContent: "center",
    boxSizing: "border-box",

  },
  button: {
    padding: "8px 16px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "pink",
    cursor: "pointer",
    minWidth: "100px",
  },
}
