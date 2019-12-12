import exporess, { Response, Request, NextFunction } from 'express'

import { getTodo, postTodo, deleteTodo, updateTodo } from '../controllers/todo'

const router = exporess.Router()

router.get('/', getTodo)

router.post('/', postTodo)

router.patch('/', updateTodo)

router.delete('/', deleteTodo)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log('[ERROR]')
	res.status(500).json({
		err: err.message
	})
})

export default router
