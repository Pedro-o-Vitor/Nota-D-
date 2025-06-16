import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import AudioBar from "./componentes/AudioBar";
import LoginPage from "./pages/LoginPage"; 
import HomePage from "./pages/HomePage";
import TrackPage from "./pages/TrackPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
  
      <PlayerProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/track/:id" element={<TrackPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/track/:id" element={<TrackPage />} /> 
        </Routes>
        <AudioBar />
      </PlayerProvider>
    
  );
}