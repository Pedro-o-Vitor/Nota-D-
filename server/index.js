const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/track/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.deezer.com/track/${req.params.id}}`);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar música:", error);
    res.status(500).json({ error: "Erro ao buscar música" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
