import React, {useState, useEffect} from 'react'
import TodoList from './components/TodoList'
import axios from 'axios'
import "./App.css"

const App = () => {
  const [todos, setTodos] = useState([])

  const reloadTodos = () => {
    setTimeout(() => {
      axios.get("http://localhost:8000/api/todos/").then(res => setTodos(res.data)).catch(err => console.log(err))
    }, 100)
  }

  useEffect(() => {
    reloadTodos()
  }, [])

  return (
    <div className="container">
      <TodoList todos={todos} reloadTodos={reloadTodos} />
    </div>
  )
}

export default App