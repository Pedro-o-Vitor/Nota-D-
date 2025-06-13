import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      alert("Por favor, digite um nome.");
      return;
    }

    // Salva o nome no localStorage (ou outro estado se preferir)
    localStorage.setItem("username", username);

    // Redireciona para a página principal
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <h1>Nota dó 🎵</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "250px"
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#1db954",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};