import React from 'react'

import classes from './App.module.scss'

import TodoList from '../../components/TodoList/TodoList'

const App: React.FC = () => {
	return (
		<div className={classes.App}>
			<p>Test</p>
			<TodoList />
		</div>
	)
}

export default App
