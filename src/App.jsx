// App.jsx - Componente principal de la aplicación

import { useState, useEffect } from 'react'
import WaterpoloGameCard from "./components/WaterpoloGameCard"
import GamesContainer from "./components/GamesContainer"
import LoadingSpinner from "./components/LoadingSpinner"
import { fetchGames } from "./services/gamesService"
import WaterpoloDateSeparator from "./components/WaterpoloDateSeparator"

function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGames = async () => {
      const gamesData = await fetchGames()
      setGames(gamesData)
      setLoading(false)
    }

    loadGames()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  // Agrupar juegos por fecha y ordenar
  const groupGamesByDate = (games) => {
    const grouped = {}
    games.forEach(game => {
      if (!grouped[game.date]) {
        grouped[game.date] = []
      }
      grouped[game.date].push(game)
    })

    // Ordenar juegos dentro de cada fecha por hora
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time))
    })

    return grouped
  }

  const groupedGames = groupGamesByDate(games)

  // Ordenar las fechas cronológicamente
  const sortedDates = Object.keys(groupedGames).sort()

  return (
    <div className="min-h-screen bg-gray-100 px-8">
      <GamesContainer>
        {sortedDates.map(date => (
          <div key={date} className="flex gap-4">
            <WaterpoloDateSeparator date={date} />
            {groupedGames[date].map(game => (
              <WaterpoloGameCard
                key={game.id}
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
          </div>
        ))}
      </GamesContainer>
    </div>
  )
}

export default App