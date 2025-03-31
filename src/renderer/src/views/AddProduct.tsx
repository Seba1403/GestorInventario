import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { createProduct, fetchCategories } from '../services/productService'

export default function AddProduct(): JSX.Element {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ id: '', name: '', price: '', category_id: '' })
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      const { categories, error } = await fetchCategories()
      if (error) {
        setError(error)
      } else {
        setCategories(categories)
      }
    }
    loadCategories()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!formData.id || !formData.name || !formData.price || !formData.category_id) {
      setError('Por favor, completa todos los campos.')
      return
    }

    // Validar que el ID sea un texto no vacío
    if (formData.id.trim() === '') {
      setError('El ID no puede estar vacío.')
      return
    }

    const price = parseFloat(formData.price)
    if (isNaN(price)) {
      setError('El precio debe ser un número válido.')
      return
    }

    const categoryId = parseInt(formData.category_id, 10)
    if (isNaN(categoryId)) {
      setError('Selecciona una categoría válida.')
      return
    }

    const { success, error } = await createProduct({
      id: formData.id, // Pasar el id como texto
      name: formData.name,
      price,
      category_id: categoryId
    })

    if (success) {
      navigate('/products')
    } else {
      setError(error || 'Error al crear el producto')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Añadir Producto</h1>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft size={20} />
          Volver a la lista
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Id del producto
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio del Producto
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
            Categoría del producto
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          Añadir Producto
        </button>
      </form>
    </div>
  )
}
