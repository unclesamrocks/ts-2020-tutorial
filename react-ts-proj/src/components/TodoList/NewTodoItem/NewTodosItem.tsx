import React, { useRef } from 'react'

import classes from './NewTodoItem.module.scss'

import { Task } from '../../../containers/App/App'

interface NewTodoItemProps {
	handleAdd: (task: Task) => void
}

const NewTodoItem: React.FC<NewTodoItemProps> = props => {
	const titleInputRef = useRef<HTMLInputElement>(null)

	const handleTodoSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const title = titleInputRef.current!.value
		titleInputRef.current!.value = ''
		props.handleAdd({ id: Math.random(), title: title })
	}

	return (
		<form className={classes.NewTodoItem} onSubmit={handleTodoSubmit}>
			<div className={classes.row}>
				<label htmlFor="title-text">Title:</label>
				<input ref={titleInputRef} type="text" id="title-text" />
			</div>
			<div className={classes.row}>
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default NewTodoItem
