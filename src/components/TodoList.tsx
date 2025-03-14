import React, { useState } from 'react'
import { CheckCircle2, Circle, Trash2, Edit, Save, X } from 'lucide-react'
import { Todo } from '../types/todo'

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  editTodo: (id: number, text: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  toggleTodo, 
  deleteTodo, 
  editTodo 
}) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditText('')
  }

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      editTodo(id, editText)
    }
    setEditingId(null)
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li key={todo.id} className="py-3">
          {editingId === todo.id ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <button
                onClick={() => saveEdit(todo.id)}
                className="bg-green-500 hover:bg-green-600 text-white p-2"
              >
                <Save size={18} />
              </button>
              <button
                onClick={cancelEditing}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-r-lg"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between group">
              <div className="flex items-center">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="mr-2 text-gray-400 hover:text-indigo-600 focus:outline-none"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-green-500" size={22} />
                  ) : (
                    <Circle size={22} />
                  )}
                </button>
                <span
                  className={`${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  className="text-gray-400 hover:text-blue-500 focus:outline-none p-1"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TodoList
