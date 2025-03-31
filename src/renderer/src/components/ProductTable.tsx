import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'

// Definimos los tipos para Producto y Categoría
export interface Product {
  id: string
  name: string
  price: number
  category_id: number
  category: string
}

export interface Category {
  id: number
  name: string
}

interface ProductTableProps {
  products: Product[]
  categories: Category[]
  onEdit: (id: string) => void
  onDelete: (id: string, name: string) => void
}

const ProductTable: React.FC<ProductTableProps> = ({ products, categories, onEdit, onDelete }) => {
  // Función para obtener el nombre de la categoría basado en el category_id
  const getCategoryName = (category_id: number): string => {
    const category = categories.find((cat) => cat.id === category_id)
    return category ? category.name : 'N/A'
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price.toFixed(0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCategoryName(product.category_id)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-6">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    onClick={() => onEdit(product.id)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900 transition-colors"
                    onClick={() => onDelete(product.id, product.name)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
