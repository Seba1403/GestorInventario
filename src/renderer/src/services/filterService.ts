import { supabase } from '../../../supabase/supabaseClient'

export type Product = {
  id: string
  name: string
  price: number
  category_id: number
}

export type FilterOptions = {
  category_id?: number
  priceMin?: number
  priceMax?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const fetchFilteredProducts = async (
  filters: FilterOptions
): Promise<{ success: boolean; data?: Product[]; error?: string }> => {
  try {
    let query = supabase.from('products').select('*')

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters.priceMin) {
      query = query.gte('price', filters.priceMin)
    }

    if (filters.priceMax) {
      query = query.lte('price', filters.priceMax)
    }

    if (filters.sortBy) {
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' })
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido al filtrar productos'
    console.error('Error al filtrar productos:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
