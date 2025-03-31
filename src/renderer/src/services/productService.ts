import { supabase } from '../../../supabase/supabaseClient'

export interface Product {
  id: string
  name: string
  price: number
  category_id: number
  category: string
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

export const initialProductState: ProductState = {
  products: [],
  loading: true,
  error: null
}

export const checkSession = async (): Promise<string | null> => {
  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession()

    if (sessionError) throw sessionError

    if (session) {
      return null
    } else {
      return 'No hay sesión activa'
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al verificar sesión:', error)
      return error.message
    } else {
      console.error('Error desconocido al verificar sesión:', error)
      return 'Ocurrió un error desconocido'
    }
  }
}

export const fetchProducts = async (filters: {
  category_id?: number
  priceMin?: number
  priceMax?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}): Promise<ProductState> => {
  try {
    let query = supabase.from('products').select('*')

    // Aplicar los filtros a la consulta
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

    const { data, error: fetchError } = await query

    if (fetchError) throw fetchError

    return {
      products: data || [],
      loading: false,
      error: null
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido al cargar productos'
    console.error('Error detallado:', error)
    return {
      products: [],
      loading: false,
      error: errorMessage
    }
  }
}

export const getProductById = async (
  id: string
): Promise<{ product: Product | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

    if (error) throw error

    return { product: data, error: null }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error al obtener el producto'
    console.error('Error al obtener producto:', error)
    return { product: null, error: errorMessage }
  }
}

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from('products').update(product).eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el producto'
    console.error('Error al actualizar producto:', error)
    return { success: false, error: errorMessage }
  }
}

export const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido al eliminar producto'
    console.error('Error al eliminar producto:', error)
    return { success: false, error: errorMessage }
  }
}

export const fetchCategories = async (): Promise<{
  categories: { id: number; name: string }[]
  error?: string
}> => {
  try {
    const { data, error } = await supabase.from('categories').select('id, name')

    if (error) throw error

    return { categories: data || [] }
  } catch (error: unknown) {
    console.error('Error al obtener categorías:', error)
    return { categories: [], error: 'Error al cargar categorías' }
  }
}

export const createProduct = async (
  product: Product
): Promise<{ success: boolean; data?: Product[]; error?: string }> => {
  try {
    console.log('Producto a insertar:', product) // Agregado para depuración

    const { data, error } = await supabase.from('products').insert([product]).select()

    if (error) throw error

    return { success: true, data }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido al crear el producto'
    console.error('Error al crear producto:', error)
    return { success: false, error: errorMessage }
  }
}
