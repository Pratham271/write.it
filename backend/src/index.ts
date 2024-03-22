import { Hono } from 'hono'

import { cors } from 'hono/cors'
import userRouter from './routes/user'
import blogsRouter from './routes/blog'

const app = new Hono()
app.use(cors())

app.route("/api/v1/user", userRouter)
app.route("/api/v1/",blogsRouter )

export default app
