// Hero.jsx - Componente Hero inspirado en diseño moderno para club de waterpolo

import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-cyan-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
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
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Logo and Title */}
              <div className="flex flex-col items-center lg:items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center shadow-2xl">
                  <img
                    src="/images/club-logo.png"
                    alt="CPA Medellín"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-300 mb-2">
                    Club de Waterpolo
                  </p>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                    CPA
                    <span className="block text-cyan-400">MEDELLÍN</span>
                  </h1>
                  <p className="text-lg font-semibold text-amber-300/90 mt-3">
                    Desde 1987 • Tradición y excelencia en el waterpolo
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-cyan-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Únete al club más prestigioso de waterpolo de Colombia.
                Formación de alto rendimiento, competencia nacional e internacional.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link
                  to="/club"
                  className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold text-lg hover:bg-cyan-700 active:bg-cyan-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Únete al Club
                </Link>
                <Link
                  to="/"
                  className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                >
                  Ver Partidos
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">35+</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Años de Historia</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">50+</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Atletas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">12</p>
                  <p className="text-sm font-semibold text-cyan-300/80">Títulos</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Circle with Logo */}
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                    <img
                      src="/images/club-logo.png"
                      alt="CPA Medellín"
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl animate-pulse delay-75"></div>

                {/* Ring Elements */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse delay-150"></div>
                <div className="absolute inset-4 rounded-full border border-white/5 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent"></div>
    </div>
  );
}

export default Hero;
