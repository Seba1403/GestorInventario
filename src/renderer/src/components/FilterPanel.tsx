import React from 'react'

type FilterPanelProps = {
  filters: {
    category_id: string
    priceMin: string
    priceMax: string
    sortBy: 'name' | 'price'
    sortOrder: 'asc' | 'desc'
  }
  categories: { id: number; name: string }[]
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onApplyFilters: () => void
}

const FilterPanel = ({
  filters,
  categories,
  onFilterChange,
  onApplyFilters
}: FilterPanelProps): JSX.Element => {
  return (
    <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
      <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
        Categoría
      </label>
      <select
        id="category_id"
        name="category_id"
        value={filters.category_id}
        onChange={onFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mt-4">
        Precio Mínimo
      </label>
      <input
        id="priceMin"
        name="priceMin"
        type="number"
        value={filters.priceMin}
        onChange={onFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Filtrar por precio mínimo"
      />
      <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mt-4">
        Precio Máximo
      </label>
      <input
        id="priceMax"
        name="priceMax"
        type="number"
        value={filters.priceMax}
        onChange={onFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Filtrar por precio máximo"
      />
      <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mt-4">
        Ordenar por
      </label>
      <select
        id="sortBy"
        name="sortBy"
        value={filters.sortBy}
        onChange={onFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
      </select>
      <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mt-4">
        Orden
      </label>
      <select
        id="sortOrder"
        name="sortOrder"
        value={filters.sortOrder}
        onChange={onFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <button
        type="button"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
        onClick={onApplyFilters}
      >
        Aplicar Filtros
      </button>
    </div>
  )
}

export default FilterPanel
