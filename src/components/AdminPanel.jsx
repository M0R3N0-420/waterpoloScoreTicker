// AdminPanel.jsx - Panel de administración para controlar todos los partidos

import { useState, useEffect } from 'react';
import { fetchGames } from '../services/gamesService';
import { subscribeToAllGames } from '../services/realtimeService';
import GameControlPanel from './GameControlPanel';
import LoadingSpinner from './LoadingSpinner';

function AdminPanel() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
        // Seleccionar el primer partido por defecto (si hay partidos)
        if (gamesData.length > 0) {
          setSelectedGame(gamesData[0]);
        }
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();

    // Suscribirse a actualizaciones en tiempo real
    const channel = subscribeToAllGames((payload) => {
      console.log('AdminPanel real-time update:', payload);

      if (payload.eventType === 'UPDATE') {
        // Actualizar el partido modificado en la lista
        setGames(prevGames =>
          prevGames.map(game =>
            game.id === payload.new.id ? payload.new : game
          )
        );

        // Si el partido actualizado es el seleccionado, actualizarlo también
        if (selectedGame && payload.new.id === selectedGame.id) {
          setSelectedGame(payload.new);
        }
      } else if (payload.eventType === 'INSERT') {
        // Agregar nuevo partido a la lista
        setGames(prevGames => [payload.new, ...prevGames]);
      } else if (payload.eventType === 'DELETE') {
        // Eliminar partido de la lista
        setGames(prevGames => {
          const remainingGames = prevGames.filter(game => game.id !== payload.old.id);

          // Si el partido eliminado era el seleccionado, seleccionar otro
          if (selectedGame && payload.old.id === selectedGame.id) {
            setSelectedGame(remainingGames.length > 0 ? remainingGames[0] : null);
          }

          return remainingGames;
        });
      }
    });

    // Cleanup: cancelar suscripción al desmontar
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleGameUpdate = (updatedGame) => {
    // Actualizar el partido seleccionado
    setSelectedGame(updatedGame);

    // También actualizar el partido en la lista de juegos
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === updatedGame.id ? updatedGame : game
      )
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      'EN VIVO': 'bg-amber-50 text-amber-800 border-amber-200',
      'FINALIZADO': 'bg-slate-100 text-slate-800 border-slate-200',
      'PROGRAMADO': 'bg-cyan-50 text-cyan-800 border-cyan-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles['PROGRAMADO']}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Panel de Control de Partidos
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {games.length} partido{games.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Partidos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-4 py-3 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Partidos
                </h2>
              </div>
              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {games.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No hay partidos disponibles
                  </div>
                ) : (
                  games.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className={`px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 ${selectedGame?.id === game.id ? 'bg-cyan-50 border-l-4 border-cyan-700' : ''
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {getStatusBadge(game.status)}
                        <span className="text-xs text-gray-500">
                          {game.date} • {game.time}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {game.home_team} vs {game.away_team}
                      </div>
                      <div className="text-xs text-gray-500">
                        {game.competition}
                      </div>
                      {(game.home_score !== null && game.away_score !== null) && (
                        <div className="text-sm font-bold text-gray-700 mt-1">
                          {game.home_score} - {game.away_score}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Panel de Control del Partido Seleccionado */}
          <div className="lg:col-span-2">
            {selectedGame ? (
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedGame.home_team} vs {selectedGame.away_team}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedGame.competition} • {selectedGame.date} • {selectedGame.time}
                        </p>
                      </div>
                      {getStatusBadge(selectedGame.status)}
                    </div>
                  </div>
                </div>

                <GameControlPanel
                  game={selectedGame}
                  onUpdate={handleGameUpdate}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecciona un partido
                  </h3>
                  <p className="text-sm text-gray-500">
                    Elige un partido de la lista para comenzar a editarlo
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
