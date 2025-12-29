import { describe, test, expect } from 'bun:test'
import { z } from 'zod'
import app from '../src/index'

let welcomeSchema = z.object({
	message: z.string(),
	version: z.string(),
})

let healthSchema = z.object({
	status: z.string(),
	timestamp: z.string(),
})

let personSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	matchmakerId: z.string().uuid(),
	createdAt: z.string(),
})

describe('API Application', () => {
	describe('GET /', () => {
		test('should return welcome message', async () => {
			let req = new Request('http://localhost/')
			let res = await app.fetch(req)

			expect(res.status).toBe(200)

			let json = await res.json()
			let data = welcomeSchema.parse(json)

			expect(data.message).toBe('Matchmaker API')
			expect(data.version).toBe('0.1.0')
		})
	})

	describe('GET /health', () => {
		test('should return healthy status', async () => {
			let req = new Request('http://localhost/health')
			let res = await app.fetch(req)

			expect(res.status).toBe(200)

			let json = await res.json()
			let data = healthSchema.parse(json)

			expect(data.status).toBe('healthy')
			expect(data.timestamp).toBeDefined()
		})
	})

	describe('POST /people', () => {
		test('should create person with valid data', async () => {
			let req = new Request('http://localhost/people', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'John Doe',
					matchmakerId: '123e4567-e89b-42d3-a456-426614174000',
				}),
			})
			let res = await app.fetch(req)

			expect(res.status).toBe(201)

			let json = await res.json()
			let data = personSchema.parse(json)

			expect(data.name).toBe('John Doe')
			expect(data.matchmakerId).toBe('123e4567-e89b-42d3-a456-426614174000')
		})

		test('should reject invalid data', async () => {
			let req = new Request('http://localhost/people', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: '',
					matchmakerId: 'not-a-uuid',
				}),
			})
			let res = await app.fetch(req)

			expect(res.status).toBe(400)
		})
	})
})
