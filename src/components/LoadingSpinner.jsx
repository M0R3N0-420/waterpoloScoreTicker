// LoadingSpinner.jsx - Componente de estado de carga

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-700"></div>
        <span className="text-slate-700 font-semibold">Cargando partidos...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
