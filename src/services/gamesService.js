// src/services/gamesService.js
import { supabase } from '../config/supabase';

// Función para convertir fechas al formato YYYYMMDD para ordenación
const parseGameDate = (dateStr) => {
  if (!dateStr) return '99999999'; // Fechas inválidas al final

  // Convertir formato '26 Ene' a '20240126' (asumiendo año actual)
  const months = {
    'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Ago': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
  };

  const [day, monthAbbr] = dateStr.split(' ');
  const month = months[monthAbbr] || '12';
  const year = new Date().getFullYear();

  return `${year}${month}${day.padStart(2, '0')}`;
};

// Función para convertir horas a minutos para ordenación
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 24 * 60; // Hora inválida al final

  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export const fetchGames = async () => {
  try {
    // Primero obtenemos todos los juegos
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Ordenamos los juegos por estado, fecha y hora
    const sortedGames = [...data].sort((a, b) => {
      // Prioridad de estados: EN VIVO > PROGRAMADO > FINALIZADO
      const statusOrder = {
        'EN VIVO': 0,
        'PROGRAMADO': 1,
        'FINALIZADO': 2
      };

      // Si los estados son diferentes, ordenar por prioridad de estado
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }

      // Si tienen el mismo estado, ordenar por fecha
      const dateA = parseGameDate(a.date);
      const dateB = parseGameDate(b.date);

      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }

      // Si tienen la misma fecha, ordenar por hora
      const timeA = a.time || '11:59 PM';
      const timeB = b.time || '11:59 PM';

      return parseTimeToMinutes(timeA) - parseTimeToMinutes(timeB);
    });

    return sortedGames;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const fetchLatestGame = async () => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .in('status', ['EN VIVO', 'FINALIZADO'])
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching latest game:', error);
    return null;
  }
};

export const fetchTopScorers = async () => {
  try {
    // Esta función podría conectarse a una tabla de jugadores o estadísticas
    // Por ahora, retornamos datos mockeados que podrías mover a Supabase después
    return [
      {
        name: "Santiago Ruiz",
        position: "Captain • CF",
        goals: 42,
        image: "/images/players/santiago-ruiz.jpg"
      },
      {
        name: "Isabella Gomez",
        position: "Wing Player",
        goals: 38,
        image: "/images/players/isabella-gomez.jpg"
      },
      {
        name: "Mateo Alvarez",
        position: "Driver",
        goals: 31,
        image: "/images/players/mateo-alvarez.jpg"
      }
    ]
  } catch (error) {
    console.error('Error fetching top scorers:', error)
    return []
  }
}

export const fetchUpcomingGames = async () => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('status', 'PROGRAMADO')
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .limit(5);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    return [];
  }
}

export const createGame = async (gameData) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .insert([gameData])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error creating game:', error)
    return null
  }
}