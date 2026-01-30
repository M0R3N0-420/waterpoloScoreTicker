// playersService.js - Servicio para gestionar jugadores en Supabase

import { supabase } from '../config/supabase';

// Estructura de la tabla 'players' en Supabase:
/*
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  number INTEGER NOT NULL,
  position TEXT NOT NULL, -- 'GK', 'DEF', 'ATT', 'CF'
  country TEXT NOT NULL,
  image TEXT, -- URL de la imagen
  stats JSONB DEFAULT '{}', -- {goals, assists, saves, games, etc.}
  category TEXT NOT NULL, -- 'semillero', 'juvenil', 'masculino', 'femenino'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

// Obtener todos los jugadores
export const fetchPlayers = async (category = null) => {
  try {
    let query = supabase
      .from('players')
      .select('*')
      .eq('is_active', true)
      .order('number', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

// Obtener jugadores por posición
export const fetchPlayersByPosition = async (position) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('position', position)
      .eq('is_active', true)
      .order('number', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching players by position:', error);
    return [];
  }
};

// Crear nuevo jugador
export const createPlayer = async (playerData) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .insert([{
        ...playerData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
};

// Actualizar jugador
export const updatePlayer = async (id, playerData) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .update({
        ...playerData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

// Eliminar jugador (soft delete)
export const deletePlayer = async (id) => {
  try {
    const { error } = await supabase
      .from('players')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};

// Subir imagen de jugador
export const uploadPlayerImage = async (file, playerId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${playerId}.${fileExt}`;
    const filePath = `players/${fileName}`;

    // Subir archivo a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('club-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data } = supabase.storage
      .from('club-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading player image:', error);
    throw error;
  }
};

// Obtener estadísticas del equipo
export const getTeamStats = async (category = null) => {
  try {
    let query = supabase
      .from('players')
      .select('stats')
      .eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Calcular estadísticas totales
    const stats = data.reduce((acc, player) => {
      const playerStats = player.stats || {};
      return {
        totalGoals: acc.totalGoals + (playerStats.goals || 0),
        totalAssists: acc.totalAssists + (playerStats.assists || 0),
        totalSaves: acc.totalSaves + (playerStats.saves || 0),
        totalGames: acc.totalGames + (playerStats.games || 0),
        totalPlayers: acc.totalPlayers + 1
      };
    }, {
      totalGoals: 0,
      totalAssists: 0,
      totalSaves: 0,
      totalGames: 0,
      totalPlayers: 0
    });

    return stats;
  } catch (error) {
    console.error('Error getting team stats:', error);
    return {
      totalGoals: 0,
      totalAssists: 0,
      totalSaves: 0,
      totalGames: 0,
      totalPlayers: 0
    };
  }
};
