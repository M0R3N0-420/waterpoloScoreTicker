// Hero.jsx - Componente Hero moderno para el dashboard

function Hero() {
  return (
    <div className="relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-black">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-16 text-center">
        {/* Main Title */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Waterpolo
            <span className="block text-3xl md:text-4xl font-light text-blue-200 mt-2">
              Games Dashboard
            </span>
          </h1>

          {/* Animated Underline */}
          <div className="relative inline-block">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full transform scale-x-0 animate-pulse"></div>
            <p className="text-xl text-blue-100 font-medium">
              Seguimiento en tiempo real de partidos
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">🏊</div>
            <div className="text-sm text-blue-200">Deportes Acuáticos</div>
            <div className="text-lg font-semibold text-white">Waterpolo</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">⚡</div>
            <div className="text-sm text-blue-200">Actualización</div>
            <div className="text-lg font-semibold text-white">En Vivo</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">📊</div>
            <div className="text-sm text-blue-200">Estadísticas</div>
            <div className="text-lg font-semibold text-white">Tiempo Real</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg">
            Ver Partidos
          </button>
          <button className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/50 hover:bg-white/10 transition-colors duration-200">
            Estadísticas
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl animate-pulse delay-75"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-150"></div>
    </div>
  );
}

export default Hero;
