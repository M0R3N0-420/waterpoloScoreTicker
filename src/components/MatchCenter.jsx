// MatchCenter.jsx - Sección de centro de partidos

import { useState, useEffect } from 'react';
import { fetchLatestGame, fetchUpcomingGames } from '../services/gamesService';
import { subscribeToAllGames } from '../services/realtimeService';

function MatchCenter() {
  const [latestMatch, setLatestMatch] = useState(null);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para convertir fechas al formato YYYYMMDD para ordenación
  const parseGameDate = (dateStr) => {
    if (!dateStr) return '99999999'; // Fechas inválidas al final

    // Convertir formato '12 Mar' a '20240312' (asumiendo año actual)
    const months = {
      'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Ago': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
    };

    const [day, monthAbbr] = dateStr.split(' ');
    const month = months[monthAbbr] || '12';
    const year = new Date().getFullYear();

    return `${year}${month}${day.padStart(2, '0')}`;
  };

  // Función para convertir horas a minutos para ordenación
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 24 * 60; // Hora inválida al final

    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // Función para ordenar partidos correctamente
  const sortGamesByDateAndTime = (games) => {
    return [...games].sort((a, b) => {
      // Primero ordenar por fecha
      const dateA = parseGameDate(a.date);
      const dateB = parseGameDate(b.date);

      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }

      // Si tienen la misma fecha, ordenar por hora
      const timeA = a.time || '11:59 PM';
      const timeB = b.time || '11:59 PM';

      return parseTimeToMinutes(timeA) - parseTimeToMinutes(timeB);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [matchData, upcomingData] = await Promise.all([
          fetchLatestGame(),
          fetchUpcomingGames()
        ]);

        setLatestMatch(matchData);
        setUpcomingGames(sortGamesByDateAndTime(upcomingData));
      } catch (error) {
        console.error('Error loading MatchCenter data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Suscribirse a actualizaciones en tiempo real
    const channel = subscribeToAllGames((payload) => {
      console.log('Real-time update received:', payload);

      if (payload.eventType === 'UPDATE') {
        // Si el partido actualizado es el que estamos mostrando, actualizarlo
        if (latestMatch && payload.new.id === latestMatch.id) {
          setLatestMatch(payload.new);
        } else if (payload.new.status === 'EN VIVO') {
          // Si hay un nuevo partido EN VIVO, mostrarlo
          setLatestMatch(payload.new);
        } else if (!latestMatch || payload.new.created_at > latestMatch.created_at) {
          // Si es más reciente y no hay partidos EN VIVO, actualizar
          setLatestMatch(payload.new);
        }
      } else if (payload.eventType === 'INSERT') {
        // Si se inserta un nuevo partido EN VIVO, mostrarlo inmediatamente
        if (payload.new.status === 'EN VIVO') {
          setLatestMatch(payload.new);
        }
      }
    });

    // Cleanup: cancelar suscripción al desmontar
    return () => {
      channel.unsubscribe();
    };
  }, [latestMatch]);

  // Formatear datos del partido para el componente
  const formatMatchData = (match) => {
    if (!match) return null;

    // Determinar el cuarto actual o el último jugado
    const getCurrentQuarter = () => {
      if (match.status === 'EN VIVO') {
        return match.period || 1; // Si está en vivo, usar el período actual
      } else if (match.status === 'FINALIZADO') {
        return 0; // Si está finalizado, no hay cuarto actual
      } else {
        return 0; // Si está programado, no hay cuartos jugados
      }
    };

    const currentQuarter = getCurrentQuarter();

    return {
      competition: match.competition || "Copa Antioquia",
      result: match.home_score > match.away_score ? "Victory" :
        match.home_score < match.away_score ? "Defeat" : "Draw",
      homeTeam: match.home_team || "CPA Medellin",
      awayTeam: match.away_team || "Opponent",
      homeScore: match.home_score || 0,
      awayScore: match.away_score || 0,
      currentQuarter: currentQuarter,
      status: match.status || 'PROGRAMADO',
      quarters: [
        {
          period: "Q1",
          homeScore: match.q1_home_score || 0,
          awayScore: match.q1_away_score || 0,
          isCurrent: currentQuarter === 1,
          isCompleted: currentQuarter > 1 || match.status === 'FINALIZADO'
        },
        {
          period: "Q2",
          homeScore: match.q2_home_score || 0,
          awayScore: match.q2_away_score || 0,
          isCurrent: currentQuarter === 2,
          isCompleted: currentQuarter > 2 || match.status === 'FINALIZADO'
        },
        {
          period: "Q3",
          homeScore: match.q3_home_score || 0,
          awayScore: match.q3_away_score || 0,
          isCurrent: currentQuarter === 3,
          isCompleted: currentQuarter > 3 || match.status === 'FINALIZADO'
        },
        {
          period: "Q4",
          homeScore: match.q4_home_score || 0,
          awayScore: match.q4_away_score || 0,
          isCurrent: currentQuarter === 4,
          isCompleted: match.status === 'FINALIZADO'
        }
      ]
    };
  };

  const matchData = formatMatchData(latestMatch);

  if (loading) {
    return (
      <div className="px-6 md:px-10 pb-16">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700"></div>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="px-6 md:px-10 pb-16">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay partidos finalizados disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:px-10 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-gray-800 text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
          <span className="w-2 h-8 bg-cyan-700 rounded-full"></span>
          Match Center
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Result */}
        <div className="lg:col-span-2 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase text-gray-500">
              Último Resultado • {matchData.competition}
            </span>
            {matchData.status === 'EN VIVO' && (
              <span className="flex items-center gap-2 text-xs font-bold text-amber-700">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                EN VIVO
              </span>
            )}
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-between py-10">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center p-4 border-2 border-cyan-700">
                <div className="w-16 h-16 bg-cyan-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CPA</span>
                </div>
              </div>
              <p className="text-xl font-black uppercase tracking-tight text-gray-800">
                {matchData.homeTeam}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="text-6xl md:text-7xl font-black text-gray-800 tracking-tighter flex gap-6">
                <span>{matchData.homeScore}</span>
                <span className="text-cyan-700">-</span>
                <span>{matchData.awayScore}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-4">
                Resultado Final
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center p-4 border-2 border-slate-300">
                <span className="text-gray-400 font-bold text-xl">
                  {matchData.awayTeam.substring(0, 3).toUpperCase()}
                </span>
              </div>
              <p className="text-xl font-black uppercase tracking-tight text-gray-500">
                {matchData.awayTeam}
              </p>
            </div>
          </div>

          {/* Quarter Breakdown */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {matchData.quarters.map((quarter, index) => (
              <div
                key={quarter.period}
                className={`p-4 rounded-xl flex flex-col items-center transition-all duration-300 ${quarter.isCurrent
                  ? 'bg-cyan-50 border-2 border-cyan-700 shadow-lg scale-105'
                  : quarter.isCompleted
                    ? 'bg-slate-50 border border-slate-200'
                    : 'bg-slate-100 border border-slate-200 opacity-60'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase">
                    {quarter.period}
                  </span>
                  {quarter.isCurrent && (
                    <span className="flex h-2 w-2 rounded-full bg-cyan-700 animate-pulse"></span>
                  )}
                </div>
                <span className={`text-lg font-bold ${quarter.isCurrent ? 'text-cyan-700' :
                  quarter.isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                  {quarter.homeScore} - {quarter.awayScore}
                </span>
                {!quarter.isCompleted && !quarter.isCurrent && (
                  <span className="text-[8px] text-gray-400 mt-1">Pendiente</span>
                )}
              </div>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="mt-4 text-center">
            <span className={`text-sm font-medium ${matchData.status === 'EN VIVO' ? 'text-cyan-700' :
              matchData.status === 'FINALIZADO' ? 'text-gray-600' :
                'text-gray-400'
              }`}>
              {matchData.status === 'EN VIVO' ? `Jugando ${matchData.quarters.find(q => q.isCurrent)?.period}` :
                matchData.status === 'FINALIZADO' ? 'Partido Finalizado' :
                  'Partido Programado'}
            </span>
          </div>
        </div>

        {/* Próximos Partidos */}
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
            <span className="text-cyan-700">📅</span>
            Próximos Partidos
          </h3>

          <div className="flex flex-col gap-4">
            {upcomingGames.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">📋</span>
                <p className="text-sm font-medium">No hay partidos programados</p>
                <p className="text-xs mt-1">Los próximos partidos aparecerán aquí</p>
              </div>
            ) : (
              upcomingGames.map((game, index) => (
                <div
                  key={game.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${index === 0
                    ? 'bg-cyan-50 border border-cyan-200'
                    : 'bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                    }`}
                >
                  <div className="flex flex-col items-center justify-center min-w-[60px]">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {game.date}
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {game.time}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">
                      {game.home_team} vs {game.away_team}
                    </p>
                    <p className="text-[10px] text-cyan-700 uppercase font-bold tracking-wider">
                      {game.competition}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      PROGRAMADO
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCenter;
