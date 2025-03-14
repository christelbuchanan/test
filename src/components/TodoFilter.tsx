import React from 'react'

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed'
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setFilter('all')}
        className={`px-2 py-1 rounded ${
          filter === 'all'
            ? 'bg-indigo-100 text-indigo-700 font-medium'
            : 'hover:text-gray-700'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-2 py-1 rounded ${
          filter === 'active'
            ? 'bg-indigo-100 text-indigo-700 font-medium'
            : 'hover:text-gray-700'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-2 py-1 rounded ${
          filter === 'completed'
            ? 'bg-indigo-100 text-indigo-700 font-medium'
            : 'hover:text-gray-700'
        }`}
      >
        Completed
      </button>
    </div>
  )
}

export default TodoFilter
