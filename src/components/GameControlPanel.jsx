// GameControlPanel.jsx - Panel de control para actualizar partidos en tiempo real

import { useEffect, useState } from 'react';
import { updateGame, updateGameStatus } from '../services/realtimeService';

function GameControlPanel({ game, onUpdate }) {
  const [localScores, setLocalScores] = useState({
    home: game.home_score || 0,
    away: game.away_score || 0
  });

  const [localQuarters, setLocalQuarters] = useState({
    q1Home: game.q1_home_score || 0,
    q1Away: game.q1_away_score || 0,
    q2Home: game.q2_home_score || 0,
    q2Away: game.q2_away_score || 0,
    q3Home: game.q3_home_score || 0,
    q3Away: game.q3_away_score || 0,
    q4Home: game.q4_home_score || 0,
    q4Away: game.q4_away_score || 0
  });

  const [currentPeriod, setCurrentPeriod] = useState(game.period || 1);

  const getMaxAccumulatedFromQuarters = (quarters) => {
    const homeMax = Math.max(quarters.q1Home || 0, quarters.q2Home || 0, quarters.q3Home || 0, quarters.q4Home || 0);
    const awayMax = Math.max(quarters.q1Away || 0, quarters.q2Away || 0, quarters.q3Away || 0, quarters.q4Away || 0);
    return { homeMax, awayMax };
  };

  const setCurrentQuarterToScores = (period, scores) => {
    setLocalQuarters((prev) => {
      const next = { ...prev };
      next[`q${period}Home`] = scores.home;
      next[`q${period}Away`] = scores.away;
      return next;
    });
  };

  useEffect(() => {
    const nextQuarters = {
      q1Home: game.q1_home_score || 0,
      q1Away: game.q1_away_score || 0,
      q2Home: game.q2_home_score || 0,
      q2Away: game.q2_away_score || 0,
      q3Home: game.q3_home_score || 0,
      q3Away: game.q3_away_score || 0,
      q4Home: game.q4_home_score || 0,
      q4Away: game.q4_away_score || 0
    };

    setLocalQuarters(nextQuarters);

    const { homeMax, awayMax } = getMaxAccumulatedFromQuarters(nextQuarters);
    setLocalScores({
      home: Math.max(game.home_score || 0, homeMax),
      away: Math.max(game.away_score || 0, awayMax)
    });

    setCurrentPeriod(game.period || 1);
  }, [game.id]);

  const handleScoreUpdate = async () => {
    const success = await updateGame(game.id, {
      home_score: localScores.home,
      away_score: localScores.away,
      period: currentPeriod,
      q1_home_score: localQuarters.q1Home,
      q1_away_score: localQuarters.q1Away,
      q2_home_score: localQuarters.q2Home,
      q2_away_score: localQuarters.q2Away,
      q3_home_score: localQuarters.q3Home,
      q3_away_score: localQuarters.q3Away,
      q4_home_score: localQuarters.q4Home,
      q4_away_score: localQuarters.q4Away,
      updated_at: new Date().toISOString()
    });
    if (success) {
      onUpdate(success);
      window.dispatchEvent(new CustomEvent('game:updated', { detail: success }));
      localStorage.setItem('game:updated', JSON.stringify({ at: Date.now(), game: success }));
      alert('Marcador actualizado');
    }
  };

  const handleStatusChange = async (newStatus) => {
    const success = await updateGameStatus(game.id, newStatus);
    if (success) {
      onUpdate(success);
      window.dispatchEvent(new CustomEvent('game:updated', { detail: success }));
      localStorage.setItem('game:updated', JSON.stringify({ at: Date.now(), game: success }));
      alert(`Estado cambiado a ${newStatus}`);
    }
  };

  const handleResetScore = async () => {
    const confirmed = window.confirm('¿Reiniciar marcador y cuartos a 0?');
    if (!confirmed) return;

    const resetGame = await updateGame(game.id, {
      home_score: 0,
      away_score: 0,
      period: 1,
      q1_home_score: 0,
      q1_away_score: 0,
      q2_home_score: 0,
      q2_away_score: 0,
      q3_home_score: 0,
      q3_away_score: 0,
      q4_home_score: 0,
      q4_away_score: 0,
      updated_at: new Date().toISOString()
    });

    if (resetGame) {
      // Actualizar UI local inmediatamente
      setLocalScores({ home: 0, away: 0 });
      setLocalQuarters({
        q1Home: 0,
        q1Away: 0,
        q2Home: 0,
        q2Away: 0,
        q3Home: 0,
        q3Away: 0,
        q4Home: 0,
        q4Away: 0
      });
      setCurrentPeriod(1);

      onUpdate(resetGame);
      window.dispatchEvent(new CustomEvent('game:updated', { detail: resetGame }));
      localStorage.setItem('game:updated', JSON.stringify({ at: Date.now(), game: resetGame }));
      alert('Marcador reiniciado');
    }
  };

  const incrementScore = (team) => {
    setLocalScores((prevScores) => {
      const nextScores = {
        ...prevScores,
        [team]: prevScores[team] + 1
      };
      setCurrentQuarterToScores(currentPeriod, nextScores);
      return nextScores;
    });
  };

  const decrementScore = (team) => {
    setLocalScores((prevScores) => {
      const nextScores = {
        ...prevScores,
        [team]: Math.max(0, prevScores[team] - 1)
      };
      setCurrentQuarterToScores(currentPeriod, nextScores);
      return nextScores;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Panel de Control
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {game.home_team} <span className="text-gray-400">vs</span> {game.away_team}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border ${game.status === 'EN VIVO'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : game.status === 'FINALIZADO'
              ? 'bg-slate-100 text-slate-800 border-slate-200'
              : 'bg-cyan-50 text-cyan-800 border-cyan-200'
            }`}>
            {game.status || 'PROGRAMADO'}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border bg-white text-gray-700 border-gray-200">
            Periodo: Q{currentPeriod}
          </span>
        </div>
      </div>

      {/* Marcador Rápido */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide">Marcador</h4>
          <span className="text-xs font-semibold text-gray-500">Ajusta el acumulado</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex flex-col gap-3 rounded-xl bg-white border border-gray-200 p-4">
            <div className="min-w-0 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Local</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{game.home_team}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => decrementScore('home')}
                className="w-9 h-9 shrink-0 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              >
                −
              </button>
              <div className="w-14 shrink-0 text-center">
                <span className="text-3xl font-black text-gray-900 tabular-nums">
                  {localScores.home}
                </span>
              </div>
              <button
                type="button"
                onClick={() => incrementScore('home')}
                className="w-9 h-9 shrink-0 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="rounded-full bg-white border border-gray-200 px-4 py-2">
              <span className="text-sm font-black text-gray-600">VS</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-white border border-gray-200 p-4">
            <div className="min-w-0 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Visita</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{game.away_team}</p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => decrementScore('away')}
                className="w-9 h-9 shrink-0 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              >
                −
              </button>
              <div className="w-14 shrink-0 text-center">
                <span className="text-3xl font-black text-gray-900 tabular-nums">
                  {localScores.away}
                </span>
              </div>
              <button
                type="button"
                onClick={() => incrementScore('away')}
                className="w-9 h-9 shrink-0 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleScoreUpdate}
            className="w-full bg-cyan-700 text-white py-2.5 rounded-xl font-bold hover:bg-cyan-800 active:bg-cyan-900"
          >
            Guardar Marcador
          </button>
          <button
            type="button"
            onClick={handleResetScore}
            className="w-full bg-white text-gray-900 py-2.5 rounded-xl font-bold border border-amber-300 hover:bg-amber-50 active:bg-amber-100"
          >
            Reiniciar Marcador
          </button>
        </div>
      </div>

      {/* Control de Cuartos */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide">Cuartos (Acumulado)</h4>
            <p className="text-xs text-gray-500 mt-1">Cada cuarto representa el marcador acumulado al final del periodo</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Periodo actual</span>
            <select
              value={currentPeriod}
              onChange={(e) => {
                const nextPeriod = parseInt(e.target.value);
                setCurrentPeriod(nextPeriod);
                setCurrentQuarterToScores(nextPeriod, localScores);
              }}
              className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-800"
            >
              <option value={1}>Q1</option>
              <option value={2}>Q2</option>
              <option value={3}>Q3</option>
              <option value={4}>Q4</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-3 bg-gray-50">
            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">Periodo</div>
            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide text-center">Local</div>
            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide text-center">Visita</div>
          </div>

          {['q1', 'q2', 'q3', 'q4'].map((quarter, index) => {
            const periodNumber = index + 1;
            const isCurrent = currentPeriod === periodNumber;
            return (
              <div
                key={quarter}
                className={`grid grid-cols-3 items-center border-t border-gray-200 ${isCurrent ? 'bg-cyan-50' : 'bg-white'}`}
              >
                <div className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border ${isCurrent ? 'bg-cyan-700 text-white border-cyan-700' : 'bg-white text-gray-700 border-gray-200'
                    }`}>
                    {quarter.toUpperCase()}
                  </span>
                </div>

                <div className="px-4 py-3 flex justify-center">
                  <input
                    type="number"
                    value={localQuarters[`${quarter}Home`]}
                    onChange={(e) => setLocalQuarters(prev => ({
                      ...prev,
                      [`${quarter}Home`]: parseInt(e.target.value) || 0
                    }))}
                    className={`w-20 px-3 py-2 rounded-xl border text-center font-bold tabular-nums outline-none ${isCurrent
                      ? 'border-cyan-300 bg-white focus:ring-2 focus:ring-cyan-200'
                      : 'border-gray-200 bg-white focus:ring-2 focus:ring-gray-200'
                      }`}
                    placeholder="0"
                  />
                </div>

                <div className="px-4 py-3 flex justify-center">
                  <input
                    type="number"
                    value={localQuarters[`${quarter}Away`]}
                    onChange={(e) => setLocalQuarters(prev => ({
                      ...prev,
                      [`${quarter}Away`]: parseInt(e.target.value) || 0
                    }))}
                    className={`w-20 px-3 py-2 rounded-xl border text-center font-bold tabular-nums outline-none ${isCurrent
                      ? 'border-cyan-300 bg-white focus:ring-2 focus:ring-cyan-200'
                      : 'border-gray-200 bg-white focus:ring-2 focus:ring-gray-200'
                      }`}
                    placeholder="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control de Estado */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide">Estado del Partido</h4>
          <span className="text-xs text-gray-500">Actualiza el estado en vivo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleStatusChange('PROGRAMADO')}
            className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors ${game.status === 'PROGRAMADO'
              ? 'bg-cyan-700 text-white border-cyan-700'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
          >
            Programado
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('EN VIVO')}
            className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors ${game.status === 'EN VIVO'
              ? 'bg-amber-500 text-white border-amber-500'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
          >
            En Vivo
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('FINALIZADO')}
            className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors ${game.status === 'FINALIZADO'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
          >
            Finalizado
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameControlPanel;
