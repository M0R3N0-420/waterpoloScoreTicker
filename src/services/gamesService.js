// src/services/gamesService.js
import { supabase } from '../config/supabase'

export const fetchGames = async () => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
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