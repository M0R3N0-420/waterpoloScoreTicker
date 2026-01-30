// TeamPage.jsx - Página de equipos con datos dinámicos de Supabase

import { useEffect, useState } from "react";
import { fetchPlayers, fetchPlayersByPosition, getTeamStats } from "../services/playersService";

function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [players, setPlayers] = useState([]);
  const [teamStats, setTeamStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('masculino');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamData();
  }, [selectedCategory]);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const [playersData, statsData] = await Promise.all([
        fetchPlayers(selectedCategory),
        getTeamStats(selectedCategory)
      ]);

      setPlayers(playersData);
      setTeamStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading team data:', error);
      setLoading(false);
    }
  };

  const categories = [
    { value: 'semillero', label: 'Semillero' },
    { value: 'juvenil', label: 'Juvenil' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' }
  ];

  const positionGroups = {
    goalkeepers: players.filter(p => p.position === 'GK'),
    defenders: players.filter(p => p.position === 'DEF'),
    attackers: players.filter(p => p.position === 'ATT'),
    centers: players.filter(p => p.position === 'CF')
  };

  const PlayerCard = ({ player }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative h-48 bg-linear-to-br from-cyan-100 to-blue-100">
        {player.image ? (
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-cyan-700">{player.number}</span>
              </div>
              <p className="text-sm text-cyan-700 font-medium">Sin foto</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          #{player.number}
        </div>
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-700">
          {player.position}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-900 mb-1">{player.name}</h3>
        <p className="text-sm text-slate-600 mb-3 flex items-center gap-1">
          🏳️ {player.country}
        </p>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50 rounded-lg p-2">
            <p className="text-xs text-slate-500">Goles</p>
            <p className="font-bold text-cyan-600">{player.stats?.goals || 0}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <p className="text-xs text-slate-500">Asist</p>
            <p className="font-bold text-amber-600">{player.stats?.assists || 0}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <p className="text-xs text-slate-500">Part</p>
            <p className="font-bold text-slate-700">{player.stats?.games || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando equipo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-cyan-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
              NUESTRO
              <span className="block text-cyan-400">EQUIPO</span>
            </h1>
            <p className="text-xl text-cyan-100/90 max-w-3xl mx-auto mb-12">
              Conoce a los atletas que representan los valores y la excelencia del CPA Medellín.
            </p>

            {/* Category Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedCategory === cat.value
                    ? 'bg-cyan-600 text-white shadow-lg transform scale-105'
                    : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Team Stats */}
            {teamStats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{teamStats.totalPlayers}</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Jugadores</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{teamStats.totalGoals}</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Goles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{teamStats.totalAssists}</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Asistencias</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{teamStats.totalSaves}</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Atajadas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{teamStats.totalGames}</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Partidos</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Players Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {players.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay jugadores en esta categoría</h3>
            <p className="text-slate-500">Pronto se agregarán nuevos jugadores al equipo.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Goalkeepers */}
            {positionGroups.goalkeepers.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Porteros</h2>
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {positionGroups.goalkeepers.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {positionGroups.goalkeepers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            )}

            {/* Defenders */}
            {positionGroups.defenders.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Defensas</h2>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {positionGroups.defenders.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {positionGroups.defenders.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            )}

            {/* Centers */}
            {positionGroups.centers.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Centrales</h2>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {positionGroups.centers.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {positionGroups.centers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            )}

            {/* Attackers */}
            {positionGroups.attackers.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Atacantes</h2>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {positionGroups.attackers.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {positionGroups.attackers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamPage;
