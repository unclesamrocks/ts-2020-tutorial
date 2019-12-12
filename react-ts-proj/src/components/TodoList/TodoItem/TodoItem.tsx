import React, { memo } from 'react'

import classes from './TodoItem.module.scss'

interface TodoItemProps {
    children?: React.ReactNode
    clicked: (id: number) => void
    id: number
}

const TodoItem: React.FC<TodoItemProps> = props => {
    const { clicked, id } = props
    const handleRemove = () => clicked(id)
    console.log('[todoItem] rerender', id)
    return (
        <div className={classes.TodoItem}>
            <div className={classes.row}>{props.children}</div>
            <div className={classes.remove} onClick={handleRemove}></div>
        </div>
    )
}

export default memo(TodoItem, (prev, next) => {
    if (prev.id !== next.id) return false
    else return true
})
