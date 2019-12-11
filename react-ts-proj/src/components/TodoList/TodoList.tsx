import React from 'react'

import classes from './TodoList.module.scss'

import TodoItem from './TodoItem/TodoItem'

const TodoList: React.FC = props => {
	const todos = [
		{ id: 1, title: 'test 1' },
		{ id: 2, title: 'test 2' }
	]

	return (
		<div className={classes.TodoList}>
			{todos.map(todo => (
				<TodoItem key={todo.id}>{todo.title}</TodoItem>
			))}
		</div>
	)
}

export default TodoList
