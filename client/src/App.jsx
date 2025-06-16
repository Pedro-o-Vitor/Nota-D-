import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import AudioBar from "./componentes/AudioBar";
import LoginPage from "./pages/LoginPage"; 
import HomePage from "./pages/HomePage";
import TrackPage from "./pages/TrackPage";
import SearchPage from "./pages/SearchPage";

function AppContent() {
  const location = useLocation();
  const hideAudioBarPaths = ["/", "/register"]; // Add other paths to hide AudioBar if needed

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/track/:id" element={<TrackPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/track/:id" element={<TrackPage />} /> 
      </Routes>
      {!hideAudioBarPaths.includes(location.pathname) && <AudioBar />}
    </>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}
