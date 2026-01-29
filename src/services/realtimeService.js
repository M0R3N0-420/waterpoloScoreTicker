// realtimeService.js - Servicio para actualizaciones en tiempo real

import { supabase } from '../config/supabase'

export const subscribeToGameUpdates = (gameId, onUpdate) => {
  const channel = supabase
    .channel('game_updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'games',
        filter: `id=eq.${gameId}`
      },
      (payload) => {
        console.log('Game updated:', payload.new)
        onUpdate(payload.new)
      }
    )
    .subscribe()

  return channel
}

export const subscribeToAllGames = (onUpdate) => {
  const channel = supabase
    .channel('all_games')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'games'
      },
      (payload) => {
        console.log('Games changed:', payload)
        onUpdate(payload)
      }
    )
    .subscribe()

  return channel
}

export const unsubscribeFromChannel = (channel) => {
  supabase.removeChannel(channel)
}

// Función para actualizar un partido
export const updateGame = async (gameId, updates) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      .eq('id', gameId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating game:', error)
    return null
  }
}

// Funciones específicas para actualizaciones comunes
export const updateScore = async (gameId, homeScore, awayScore) => {
  return await updateGame(gameId, {
    home_score: homeScore,
    away_score: awayScore,
    updated_at: new Date().toISOString()
  })
}

export const updateQuarter = async (gameId, period, q1Home, q1Away, q2Home, q2Away, q3Home, q3Away, q4Home, q4Away) => {
  const updates = {
    period: period,
    updated_at: new Date().toISOString()
  }

  // Actualizar solo los cuartos que tienen datos
  if (q1Home !== undefined && q1Away !== undefined) {
    updates.q1_home_score = q1Home
    updates.q1_away_score = q1Away
  }
  if (q2Home !== undefined && q2Away !== undefined) {
    updates.q2_home_score = q2Home
    updates.q2_away_score = q2Away
  }
  if (q3Home !== undefined && q3Away !== undefined) {
    updates.q3_home_score = q3Home
    updates.q3_away_score = q3Away
  }
  if (q4Home !== undefined && q4Away !== undefined) {
    updates.q4_home_score = q4Home
    updates.q4_away_score = q4Away
  }

  return await updateGame(gameId, updates)
}

export const updateGameStatus = async (gameId, status) => {
  return await updateGame(gameId, {
    status: status,
    updated_at: new Date().toISOString()
  })
}
