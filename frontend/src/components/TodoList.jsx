import React, {useState} from 'react'
import axios from "axios"
import Todo from "./Todo"
import "./TodoList.css"

const TodoList = (props) => {
	const todos = props.todos
	const reloadTodos = props.reloadTodos;

	const [error, setError] = useState("")
	const [hidden, setHidden] = useState(true)
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const updateTitleValue = (event) => {
		setError("")
		setTitle(event.target.value);
	}

	const updateContentValue = (event) => {
		setError("")
		setContent(event.target.value)
	}

	const toggleHidden = () => {
		setHidden(!hidden)
	}

	const AddTodo = () => {
		if(!title || !content)
		{
			setError("title or content must not be empty")
			return
		}

		axios.post("http://localhost:8000/api/todos/", {title: title, content:content, done:false})
		reloadTodos()
		toggleHidden()
	}

	return (
		<div className="todos-container">
			<button className={!hidden ? "todos-add-button hidden" : "todos-add-button"} onClick={toggleHidden}>Add Todo</button>

			<div className={hidden ? "add-todo hidden" : "add-todo"}>
				<input placeholder="TITLE" value={title} onChange={updateTitleValue} />
				<input placeholder="CONTENT" value={content} onChange={updateContentValue} />

				<div className="buttons">
					<button className="cancel-button" onClick={toggleHidden}>Cancel</button>
					<button className="add-button" onClick={AddTodo}>Add</button>
				</div>
			</div>

			<div className="error">{error}</div>

			{todos.length != 0 ? <h1 className="todos-title">What to do:</h1> : null}

			<div className="todos-list">
				{todos.map(item => {return <Todo
					key={item.id}
					todo={item}
					reloadTodos={reloadTodos}
					/>}
				)}
			</div>
		</div>
	)
}

export default TodoList