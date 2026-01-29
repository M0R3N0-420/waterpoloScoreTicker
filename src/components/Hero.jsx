// Hero.jsx - Componente Hero moderno para el dashboard

import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative bg-linear-to-br from-slate-950 via-blue-950 to-cyan-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
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

        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/15 overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/club-logo.png"
                    alt="CPA Medellín"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-200/90">
                    Club de Waterpolo
                  </p>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-2">
                    CPA Medellín
                  </h1>
                  <p className="text-sm font-semibold text-amber-200/90 mt-2">
                    Desde 1987 • Pasión, disciplina y alto rendimiento
                  </p>
                </div>
              </div>

              <p className="text-lg text-cyan-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Seguimiento en vivo de nuestros partidos, resultados recientes y próximos encuentros.
                Vive el waterpolo con el club.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl bg-cyan-700 text-white font-bold hover:bg-cyan-800 active:bg-cyan-900 transition-colors shadow-lg"
                >
                  Ver Partidos
                </Link>
                <Link
                  to="/teams"
                  className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold border border-amber-200/60 hover:bg-white/10 transition-colors"
                >
                  Conocer el Equipo
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/70">Ciudad</p>
                  <p className="text-lg font-black text-white mt-1">Medellín</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/70">Fundación</p>
                  <p className="text-lg font-black text-white mt-1">1987</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/70">Enfoque</p>
                  <p className="text-lg font-black text-white mt-1">Alto rendimiento</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-cyan-500/10 blur-2xl rounded-full" />
              <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200/90">Identidad</p>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border bg-amber-50/10 text-amber-200 border-amber-200/30">
                    Waterpolo
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-950/40 border border-white/10 p-4">
                    <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Filosofía</p>
                    <p className="text-sm font-semibold text-white mt-2">Trabajo en equipo</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 border border-white/10 p-4">
                    <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Valores</p>
                    <p className="text-sm font-semibold text-white mt-2">Respeto y disciplina</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 border border-white/10 p-4">
                    <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Objetivo</p>
                    <p className="text-sm font-semibold text-white mt-2">Competir al máximo</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 border border-white/10 p-4">
                    <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Comunidad</p>
                    <p className="text-sm font-semibold text-white mt-2">Formación deportiva</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl animate-pulse delay-75"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-slate-200/10 rounded-full blur-xl animate-pulse delay-150"></div>
    </div>
  );
}

export default Hero;
