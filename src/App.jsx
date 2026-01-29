// App.jsx - Componente principal de la aplicación

import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import TeamPage from "./components/TeamPage";
import MatchCenter from "./components/MatchCenter";
import AdminPanel from "./components/AdminPanel";
import ClubPage from "./components/ClubPage";
import Layout from "./components/Layout";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <MatchCenter />
    </div>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
