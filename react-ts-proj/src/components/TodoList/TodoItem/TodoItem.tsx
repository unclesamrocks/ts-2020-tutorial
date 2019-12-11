import React from 'react'

import classes from './TodoItem.module.scss'

interface TodoItemProps {
	children?: React.ReactNode
}

const TodoItem: React.FC = (props: TodoItemProps) => {
	return <div className={classes.TodoItem}>{props.children}</div>
}

export default TodoItem
