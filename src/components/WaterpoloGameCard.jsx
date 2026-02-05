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
    <div className="w-48 h-24 bg-white border border-gray-200 rounded-md shadow-sm text-xs flex flex-col">

      {/* Parte superior - Estado y hora */}
      <div className="px-2 py-1 text-gray-600 font-semibold flex items-center justify-between">
        <div className="flex items-center gap-1">
          {isLive && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
          )}
          {isLive ? "EN VIVO" : isFinished ? "FINALIZADO" : time}
        </div>
      </div>

      {/* Equipos - Esta sección crece para ocupar el espacio disponible */}
      <div className="px-2 pb-1 space-y-1 flex-1 flex flex-col justify-center">

        {/* Equipo Local */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs">
              {/* TODO: Agregar logo del equipo local */}
            </div>
            <span className="font-medium text-gray-800">
              {homeTeam}
            </span>
          </div>

          {/* Score o espacio vacío */}
          <span className="font-semibold text-gray-900 text-sm text-right min-w-[2ch]">
            {(isLive || isFinished) ? homeScore : '\u00A0'}
          </span>
        </div>

        {/* Equipo Visitante */}
        <div className="flex justify-between items-center">
          <div className="flex items-center justify gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs">
              {/* TODO: Agregar logo del equipo visitante */}
            </div>
            <span className="font-medium text-gray-800">
              {awayTeam}
            </span>
          </div>

          {/* Score o espacio vacío */}
          <span className="font-semibold text-gray-900 text-sm text-right min-w-[2ch]">
            {(isLive || isFinished) ? awayScore : '\u00A0'}
          </span>
        </div>
      </div>

      {/* Parte inferior - Competición y período */}
      <div className="px-2 py-1 border-t text-xs text-gray-500 flex justify-between">
        <span className="truncate">{competition}</span>
        <span className="ml-2 min-w-[3ch]">
          {isLive && period ? `Q${period}` : isFinished ? 'FT' : '\u00A0'}
        </span>
      </div>
    </div>
  )
}

export default WaterpoloGameCard