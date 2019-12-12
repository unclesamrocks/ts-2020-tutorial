import React, { memo } from 'react'

import classes from './TodoList.module.scss'

import TodoItem from './TodoItem/TodoItem'

interface TodoListProps {
    items: { id: number; title: string }[]
    clicked: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = props => {
    console.log('[todoList] rerender')

    return (
        <div className={classes.TodoList}>
            {props.items.map(todo => (
                <TodoItem key={todo.id} id={todo.id} clicked={props.clicked}>
                    {todo.title}
                </TodoItem>
            ))}
        </div>
    )
}

export default memo(TodoList)
