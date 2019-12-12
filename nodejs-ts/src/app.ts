import express from 'express'
import { json } from 'body-parser'

import rootRouter from './routes/api'

const PORT: number = 3000

const app = express()

app.use(json())

app.use(rootRouter)

app.listen(PORT)

console.log(`Started App. http://localhost:${PORT}`)
