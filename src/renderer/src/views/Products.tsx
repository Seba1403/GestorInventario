import { useState, useEffect } from 'react'
import { PlusIcon, RotateCw, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  fetchProducts,
  deleteProduct,
  fetchCategories,
  ProductState,
  initialProductState
} from '../services/productService'
import { FilterOptions } from '../services/filterService'
import FilterPanel from '../components/FilterPanel'
import ProductTable from '../components/ProductTable'

interface UIFilters {
  category_id: string
  priceMin: string
  priceMax: string
  sortBy: 'name' | 'price'
  sortOrder: 'asc' | 'desc'
}

export default function Products(): JSX.Element {
  const [state, setState] = useState<ProductState>(initialProductState)
  const [isReloading, setIsReloading] = useState(false)
  const [filters, setFilters] = useState<UIFilters>({
    category_id: '',
    priceMin: '',
    priceMax: '',
    sortBy: 'name',
    sortOrder: 'asc'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  const navigate = useNavigate()

  const loadProducts = async (): Promise<void> => {
    setIsReloading(true)
    try {
      const filterOptions: FilterOptions = {
        category_id: filters.category_id ? Number(filters.category_id) : undefined,
        priceMin: filters.priceMin ? Number(filters.priceMin) : undefined,
        priceMax: filters.priceMax ? Number(filters.priceMax) : undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder as 'asc' | 'desc'
      }
      const productState = await fetchProducts(filterOptions)
      setState(productState)
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: 'Error al cargar los productos'
      }))
    } finally {
      setIsReloading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      const { categories, error } = await fetchCategories()
      if (!error) {
        setCategories(categories)
      }
    }
    loadCategories()
  }, [])

  const handleDelete = async (id: string, name: string): Promise<void> => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto ${name}?`)) {
      const { success, error } = await deleteProduct(id)
      if (success) {
        setState((prevState) => ({
          ...prevState,
          products: prevState.products.filter((product) => product.id !== id),
          error: null
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          error: error || 'Error al eliminar el producto'
        }))
      }
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleFilters = (): void => {
    setShowFilters(!showFilters)
  }

  const applyFilters = (): void => {
    loadProducts()
  }

  const handleEdit = (id: string): void => {
    navigate(`/editproduct/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors"
            onClick={() => navigate('/addproduct')}
          >
            <PlusIcon size={20} />
            Agregar Producto
          </button>
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors"
            onClick={loadProducts}
          >
            <RotateCw size={18} />
            Actualizar
          </button>
          <button
            type="button"
            className="bg-gray-800 text-white p-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors"
            onClick={toggleFilters}
          >
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {state.error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{state.error}</div>
      )}

      {showFilters && (
        <FilterPanel
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
        />
      )}

      {isReloading ? (
        <div className="text-center">Recargando productos...</div>
      ) : (
        <ProductTable
          products={state.products}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
