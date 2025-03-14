import React, { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Plus, Trash2, Edit, Save, X } from 'lucide-react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import { Todo } from '../types/todo'

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodosCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600">
        <h1 className="text-3xl font-bold text-white text-center">
          Todo List
        </h1>
      </div>
      
      <div className="p-6">
        <TodoForm addTodo={addTodo} />
        
        {todos.length > 0 && (
          <>
            <TodoList 
              todos={filteredTodos} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo}
            />
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t pt-4">
              <span>{activeTodosCount} items left</span>
              
              <TodoFilter filter={filter} setFilter={setFilter} />
              
              <button
                onClick={clearCompleted}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear completed
              </button>
            </div>
          </>
        )}
        
        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No todos yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoApp
