// WaterpoloGameCard.jsx - Con altura fija

function WaterpoloGameCard({
  date,
  time,
  competition,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  period,
  status
}) {
  const isLive = status === "EN VIVO"
  const isFinished = status === "FINALIZADO"

  return (
    <div className="w-48 h-24 bg-slate-100 border border-slate-200 rounded-md shadow-sm text-xs flex flex-col">

      {/* Parte superior - Estado, hora o fecha EN VIVO/FINALIZADO */}
      <div className="px-2 py-1 text-slate-600 font-semibold flex items-center justify-between">
        <div className="flex items-center gap-1">
          {isLive && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
            </span>
          )}
          {isLive ? "EN VIVO" : isFinished ? "FINALIZADO" : time}
        </div>
        <span className="text-xs">{date}</span>
      </div>

      {/* Equipos - Esta sección crece para ocupar el espacio disponible */}
      <div className="px-2 pb-1 space-y-1 flex-1 flex flex-col justify-center">

        {/* Equipo Local */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 border border-gray-200 rounded-full flex items-center justify-center text-xs">
              {/* TODO: Agregar logo del equipo local */}
            </div>
            <span className="font-medium text-slate-800">
              {homeTeam}
            </span>
          </div>

          {/* Score o espacio vacío */}
          <span className="font-semibold text-slate-900 text-sm text-right min-w-[2ch]">
            {(isLive || isFinished) ? homeScore : '\u00A0'}
          </span>
        </div>

        {/* Equipo Visitante */}
        <div className="flex justify-between items-center">
          <div className="flex items-center justify gap-1">
            <div className="w-4 h-4 bg-blue-700 border border-blue-200 rounded-full flex items-center justify-center text-xs">
              {/* TODO: Agregar logo del equipo visitante */}
            </div>
            <span className="font-medium text-slate-800">
              {awayTeam}
            </span>
          </div>

          {/* Score o espacio vacío */}
          <span className="font-semibold text-slate-900 text-sm text-right min-w-[2ch]">
            {(isLive || isFinished) ? awayScore : '\u00A0'}
          </span>
        </div>
      </div>

      {/* Parte inferior - Competición y período */}
      <div className="px-2 py-1 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
        <span className="truncate">{competition}</span>
        <span className="ml-2 min-w-[1ch]">
          {isLive && period ? `Q${period}` : isFinished ? 'FT' : '\u00A0'}
        </span>
      </div>
    </div>
  )
}

export default WaterpoloGameCard