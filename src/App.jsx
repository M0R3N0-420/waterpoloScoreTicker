// App.jsx - Componente principal de la aplicación

import { useState, useEffect } from 'react'
import WaterpoloGameCard from "./components/WaterpoloGameCard"
import GamesContainer from "./components/GamesContainer"
import LoadingSpinner from "./components/LoadingSpinner"
import { fetchGames } from "./services/gamesService"

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

  return (
    <div className="min-h-screen bg-gray-100 px-8">
      <GamesContainer>
        {games.map(game => (
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
  )
}

export default App