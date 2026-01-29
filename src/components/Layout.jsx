// Layout.jsx - Componente de layout principal

import { useState, useEffect } from "react";
import WaterpoloGameCard from "./WaterpoloGameCard";
import GamesContainer from "./GamesContainer";
import { fetchGames } from "../services/gamesService";
import { subscribeToAllGames } from "../services/realtimeService";

const parseGameDateForSort = (dateStr) => {
  if (!dateStr) return "99999999";

  const months = {
    Ene: "01",
    Feb: "02",
    Mar: "03",
    Abr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Ago: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dic: "12"
  };

  const [dayRaw, monthAbbr] = String(dateStr).trim().split(/\s+/);
  const day = String(dayRaw || "").padStart(2, "0");
  const month = months[monthAbbr] || "12";
  const year = new Date().getFullYear();
  return `${year}${month}${day}`;
};

const parseTimeToMinutesForSort = (timeStr) => {
  if (!timeStr) return 24 * 60;

  const raw = String(timeStr).trim();
  const parts = raw.split(/\s+/);

  // Formato 24h: "14:00"
  if (parts.length === 1) {
    const [h, m] = parts[0].split(":").map((v) => Number(v));
    if (Number.isFinite(h) && Number.isFinite(m)) return h * 60 + m;
    return 24 * 60;
  }

  // Formato 12h: "7:00 PM"
  const [time, period] = parts;
  let [hours, minutes] = time.split(":").map((v) => Number(v));

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return 24 * 60;

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const sortGamesForTopBar = (games) => {
  return [...games].sort((a, b) => {
    const dateA = parseGameDateForSort(a?.date);
    const dateB = parseGameDateForSort(b?.date);
    if (dateA !== dateB) return dateA.localeCompare(dateB);

    const timeA = parseTimeToMinutesForSort(a?.time);
    const timeB = parseTimeToMinutesForSort(b?.time);
    return timeA - timeB;
  });
};

function Layout({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderedGames = sortGamesForTopBar(games);

  useEffect(() => {
    const loadGames = async () => {
      const gamesData = await fetchGames();
      setGames(gamesData);
      setLoading(false);
    };

    loadGames();

    // Suscribirse a actualizaciones en tiempo real
    const channel = subscribeToAllGames((payload) => {
      console.log('GamesContainer real-time update:', payload);

      if (payload.eventType === 'UPDATE') {
        // Actualizar el juego modificado en la lista
        setGames(prevGames =>
          prevGames.map(game =>
            game.id === payload.new.id ? payload.new : game
          )
        );
      } else if (payload.eventType === 'INSERT') {
        // Agregar nuevo juego a la lista
        setGames(prevGames => [payload.new, ...prevGames]);
      } else if (payload.eventType === 'DELETE') {
        // Eliminar juego de la lista
        setGames(prevGames =>
          prevGames.filter(game => game.id !== payload.old.id)
        );
      }
    });

    const onGameUpdated = (event) => {
      const updatedGame = event?.detail;
      if (!updatedGame?.id) return;

      setGames((prevGames) => {
        const exists = prevGames.some((g) => g.id === updatedGame.id);
        if (!exists) return prevGames;
        return prevGames.map((g) => (g.id === updatedGame.id ? updatedGame : g));
      });
    };

    window.addEventListener('game:updated', onGameUpdated);

    const onStorage = (event) => {
      if (event.key !== 'game:updated' || !event.newValue) return;

      try {
        const parsed = JSON.parse(event.newValue);
        const updatedGame = parsed?.game;
        if (!updatedGame?.id) return;
        onGameUpdated({ detail: updatedGame });
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', onStorage);

    // Cleanup: cancelar suscripción al desmontar
    return () => {
      window.removeEventListener('game:updated', onGameUpdated);
      window.removeEventListener('storage', onStorage);
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* GamesContainer debajo del NavBar */}
      {!loading && (
        <div className="bg-slate-50 px-8">
          <GamesContainer>
            {orderedGames.map((game) => (
              <WaterpoloGameCard
                key={game.id}
                date={game.date}
                time={game.time}
                competition={game.competition}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                homeScore={game.home_score}
                awayScore={game.away_score}
                period={game.period}
                status={game.status}
              />
            ))}
          </GamesContainer>
        </div>
      )}

      {/* Contenido de la página actual */}
      {children}
    </div>
  );
}

export default Layout;
