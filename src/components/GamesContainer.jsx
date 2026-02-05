// GamesContainer.jsx - Contenedor de juegos con navegación

import { useState } from 'react'
import NavigationArrows from './NavigationArrows'

function GamesContainer({ children }) {
  const [showArrows, setShowArrows] = useState(false)

  const scrollLeft = () => {
    const container = document.getElementById('cards-container')
    container.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const container = document.getElementById('cards-container')
    container.scrollBy({ left: 200, behavior: 'smooth' })
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <NavigationArrows
        showArrows={showArrows}
        onScrollLeft={scrollLeft}
        onScrollRight={scrollRight}
      />

      {/* Contenedor de cards */}
      <div 
        id="cards-container"
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-4 items-center min-w-max justify-start py-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GamesContainer
