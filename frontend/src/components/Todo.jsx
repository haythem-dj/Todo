import React, {useState} from 'react'
import axios from 'axios'
import "./Todo.css"

const Todo = (props) => {
	const todo = props.todo
	const reloadTodos = props.reloadTodos

		const [error, setError] = useState("")
	const [update, setUpdate] = useState(true)
	const [title, setTitle] = useState(todo.title)
	const [content, setContent] = useState(todo.content)

	const toggleUpdate = () => {
		setUpdate(!update);
	}

	const updateTitleValue = (event) => {
		setError("")
		setTitle(event.target.value);
	}

	const updateContentValue = (event) => {
		setError("")
		setContent(event.target.value)
	}

	const handleDone = () => {
		axios.patch("http://localhost:8000/api/todos/"+todo.id+"/", {done:true})
		reloadTodos()
	}

	const handleUpdate = () => {
		if (todo.title == title && todo.content == content) {
			setError("the title and content did not change")
			return
		}

		axios.put("http://localhost:8000/api/todos/"+todo.id+"/", {title:title, content:content, done:false})
		toggleUpdate()
		reloadTodos()
	}

	const handleDelete = () => {
		axios.delete("http://localhost:8000/api/todos/"+todo.id+"/").catch(err => console.log(err));
		reloadTodos()
	}

	return (
		<div className="todo-container">
			<div className={update ? "update-todo hidden" : "update-todo"}>
					<input placeholder="TITLE" value={title} onChange={updateTitleValue} />
					<input placeholder="CONTENT" value={content} onChange={updateContentValue} />
				<div className="buttons">
					<button className="cancel-button" onClick={toggleUpdate} >Cancel</button>
					<button className="update-button" onClick={handleUpdate}>Update</button>
				</div>
			</div>

			<div className="error">{error}</div>

			<div className={update ? "todo" : "todo hidden"}>
				<h3 className="title">{todo.title}</h3>
				<p className="content">{todo.content}</p>

				<div className="buttons">
				{!todo.done ?
					<>
						<button className="done-button" onClick={handleDone}>done</button>
						<button className="update-button" onClick={toggleUpdate}>update</button>
					</>
					: <p className="its-done">"Its Done"</p>}
					<button className="delete-button" onClick={handleDelete}>delete</button>
				</div>
			</div>
		</div>
	)
}

export default Todo

