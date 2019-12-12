import React, { useState } from 'react'

import classes from './App.module.scss'

import TodoList from '../../components/TodoList/TodoList'
import NewTodoItem from '../../components/TodoList/NewTodoItem/NewTodosItem'

export interface Task {
    id: number
    title: string
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Task[]>([])

    const addTask = (task: Task) => setTodos(prev => prev.concat(task))

    const removeTodoTask = (id: number) =>
        setTodos(prev => prev.filter(task => task.id !== id))

    return (
        <div className={classes.App}>
            <NewTodoItem handleAdd={addTask}></NewTodoItem>
            <TodoList items={todos} clicked={removeTodoTask} />
        </div>
    )
}

export default App
