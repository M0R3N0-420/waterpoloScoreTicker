// PlayerManagement.jsx - Panel para gestionar jugadores

import { useState, useEffect } from 'react';
import { fetchPlayers, createPlayer, updatePlayer, deletePlayer, uploadPlayerImage } from '../services/playersService';

function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('masculino');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: 'ATT',
    country: 'Colombia',
    category: 'masculino',
    stats: {
      goals: 0,
      assists: 0,
      saves: 0,
      games: 0
    }
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadPlayers();
  }, [selectedCategory]);

  const loadPlayers = async () => {
    try {
      const playersData = await fetchPlayers(selectedCategory);
      setPlayers(playersData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading players:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let playerData = { ...formData };

      // Subir imagen si hay una
      if (imageFile) {
        const tempId = editingPlayer ? editingPlayer.id : Date.now().toString();
        const imageUrl = await uploadPlayerImage(imageFile, tempId);
        playerData.image = imageUrl;
      }

      if (editingPlayer) {
        await updatePlayer(editingPlayer.id, playerData);
      } else {
        await createPlayer(playerData);
      }

      resetForm();
      loadPlayers();
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      number: player.number,
      position: player.position,
      country: player.country,
      category: player.category,
      stats: player.stats || { goals: 0, assists: 0, saves: 0, games: 0 }
    });
    setShowForm(true);
  };

  const handleDelete = async (playerId) => {
    if (window.confirm('¿Estás seguro de eliminar este jugador?')) {
      try {
        await deletePlayer(playerId);
        loadPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
      position: 'ATT',
      country: 'Colombia',
      category: selectedCategory,
      stats: { goals: 0, assists: 0, saves: 0, games: 0 }
    });
    setImageFile(null);
    setEditingPlayer(null);
    setShowForm(false);
  };

  const categories = [
    { value: 'semillero', label: 'Semillero' },
    { value: 'juvenil', label: 'Juvenil' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' }
  ];

  const positions = [
    { value: 'GK', label: 'Portero (GK)' },
    { value: 'DEF', label: 'Defensa (DEF)' },
    { value: 'ATT', label: 'Atacante (ATT)' },
    { value: 'CF', label: 'Central (CF)' }
  ];

  if (loading) {
    return <div className="text-center py-8">Cargando jugadores...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Jugadores</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Agregar Jugador
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat.value
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Players List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map(player => (
            <div key={player.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden">
                  {player.image ? (
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <span className="text-xl font-bold">{player.number}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{player.name}</h3>
                  <p className="text-sm text-slate-600">#{player.number} • {player.position}</p>
                  <p className="text-xs text-slate-500">{player.country}</p>
                </div>
              </div>

              <div className="text-sm text-slate-600 mb-3">
                <div className="flex justify-between">
                  <span>Goles:</span>
                  <span className="font-semibold">{player.stats?.goals || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asistencias:</span>
                  <span className="font-semibold">{player.stats?.assists || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Partidos:</span>
                  <span className="font-semibold">{player.stats?.games || 0}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(player)}
                  className="flex-1 px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingPlayer ? 'Editar Jugador' : 'Agregar Jugador'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Número
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Posición
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {positions.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Foto del Jugador
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Goles
                  </label>
                  <input
                    type="number"
                    value={formData.stats.goals}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, goals: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Asistencias
                  </label>
                  <input
                    type="number"
                    value={formData.stats.assists}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, assists: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  {editingPlayer ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerManagement;
