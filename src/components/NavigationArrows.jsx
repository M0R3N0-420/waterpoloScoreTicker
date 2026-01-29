// NavigationArrows.jsx - Componente de flechas de navegación

function NavigationArrows({ showArrows, onScrollLeft, onScrollRight }) {
  return (
    <>
      {/* Flecha izquierda */}
      <button
        onClick={onScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 rounded-full shadow-lg p-1.5 transition-all duration-200 border border-slate-200 hover:bg-cyan-50 ${showArrows ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`}
      >
        <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flecha derecha */}
      <button
        onClick={onScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 rounded-full shadow-lg p-1.5 transition-all duration-200 border border-slate-200 hover:bg-cyan-50 ${showArrows ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`}
      >
        <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  )
}

export default NavigationArrows
