const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

const allowedOrigin = "https://shiny-meme-97wpvp5v9v642957r-5173.app.github.dev";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Optional: Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.get("/api/track/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.deezer.com/track/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar música:", error);
    res.status(500).json({ error: "Erro ao buscar música" });
  }
});

app.get("/api/tracks", async (req, res) => {
  try {
    // Example: Fetch top tracks from Deezer chart API
    const response = await axios.get("https://api.deezer.com/chart/0/tracks");
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    res.status(500).json({ error: "Erro ao buscar músicas" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
