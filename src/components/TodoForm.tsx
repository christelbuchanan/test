import React, { useState } from 'react'
import { Plus } from 'lucide-react'

interface TodoFormProps {
  addTodo: (text: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-r-lg transition-colors flex items-center"
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  )
}

export default TodoForm
