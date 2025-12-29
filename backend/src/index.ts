import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

let createPersonSchema = z.object({
	name: z.string().min(1),
	matchmakerId: z.string().uuid(),
})

let app = new Hono()

app.use('*', logger())

app.get('/', c => {
	return c.json({ message: 'Matchmaker API', version: '0.1.0' })
})

app.get('/health', c => {
	return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Example POST route with Zod validation
app.post('/people', zValidator('json', createPersonSchema), c => {
	let data = c.req.valid('json')
	return c.json(
		{
			id: crypto.randomUUID(),
			name: data.name,
			matchmakerId: data.matchmakerId,
			createdAt: new Date().toISOString(),
		},
		201
	)
})

export default app
export { app }
