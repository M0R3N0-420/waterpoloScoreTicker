// LoadingSpinner.jsx - Componente de estado de carga

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-gray-600 font-medium">Cargando partidos...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
