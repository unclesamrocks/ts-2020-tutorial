import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

const todos: Todo[] = []

export const getTodo: RequestHandler = (req, res, next) => {
	try {
		console.log('[GET][getTodo]')
		res.status(200).json({
			list: todos
		})
	} catch (error) {
		next(error)
	}
}

export const postTodo: RequestHandler = (req, res, next) => {
	try {
		console.log('[POST][postTodo]')
		const text = (req.body as { text: string }).text
		const newTodo = new Todo(
			Math.random()
				.toString()
				.replace(/0\./, ''),
			text
		)
		todos.push(newTodo)
		res.status(201).json({
			todo: newTodo,
			list: todos
		})
	} catch (error) {
		next(error)
	}
}

export const updateTodo: RequestHandler = (req, res, next) => {
	try {
		console.log('[UPDATE][deleteTodo]')
		const { id, text } = req.body as { id: string; text: string }
		const element = todos.find(el => el.id === id)
		if (element) element.text = text
		res.status(200).json({
			updatedElement: element,
			list: todos
		})
	} catch (error) {
		next(error)
	}
}

export const deleteTodo: RequestHandler = (req, res, next) => {
	try {
		console.log('[DELETE][deleteTodo]')
		const id = (req.body as { id: string }).id
		const index = todos.findIndex(el => el.id === id)
		if (index !== -1) todos.splice(index, 1)
		res.status(200).json({
			list: todos
		})
	} catch (error) {
		next(error)
	}
}
