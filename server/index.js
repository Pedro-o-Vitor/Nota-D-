const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// tracks populares
app.get("/api/tracks", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart/0/tracks");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar músicas" });
  }
});

// busca
app.get("/api/search/:query", async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/search?q=${req.params.query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro na busca" });
  }
});

// track individual
app.get("/api/track/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/track/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar música" });
  }
});

// Top Brasil (ID = 16 para Brasil na API Deezer)
app.get("/api/chart/brasil", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart/16/tracks");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar músicas do Brasil" });
  }
});

// Top Global
app.get("/api/chart/global", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart/0/tracks");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar músicas globais" });
  }
});



// Endpoint to get lyrics by artist and title
app.get("/api/lyrics/:artist/:title", async (req, res) => {
  const { artist, title } = req.params;
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    if (response.data && response.data.lyrics) {
      res.json({ lyrics: response.data.lyrics });
    } else {
      res.status(404).json({ lyrics: "Letra não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ lyrics: "Erro ao buscar letra da música." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
