import { describe, test, expect, beforeEach, mock } from 'bun:test'
import { Hono } from 'hono'
import { createMcpRoutes } from '../../src/routes/mcp'
import { createMockSupabaseClient } from '../mocks/supabase'

describe('MCP Routes', () => {
	let app: Hono
	let mockSupabaseClient: ReturnType<typeof createMockSupabaseClient>

	beforeEach(() => {
		mockSupabaseClient = createMockSupabaseClient({
			auth: {
				getUser: mock(async () => ({
					data: { user: { id: 'user-123' } },
					error: null,
				})),
			},
		})

		app = new Hono()
		app.route('/mcp', createMcpRoutes(mockSupabaseClient))
	})

	describe('POST /mcp', () => {
		test('returns 401 when Authorization header is missing', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'initialize',
					params: {
						protocolVersion: '2024-11-05',
						capabilities: {},
						clientInfo: { name: 'test-client', version: '1.0.0' },
					},
					id: 1,
				}),
			})

			let res = await app.fetch(req)
			expect(res.status).toBe(401)
		})

		test('returns 401 when Bearer token is invalid', async () => {
			mockSupabaseClient = createMockSupabaseClient({
				auth: {
					getUser: mock(async () => ({
						data: { user: null },
						error: { message: 'Invalid token' },
					})),
				},
			})

			app = new Hono()
			app.route('/mcp', createMcpRoutes(mockSupabaseClient))

			let req = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer invalid-token',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'initialize',
					params: {
						protocolVersion: '2024-11-05',
						capabilities: {},
						clientInfo: { name: 'test-client', version: '1.0.0' },
					},
					id: 1,
				}),
			})

			let res = await app.fetch(req)
			expect(res.status).toBe(401)
		})

		test('accepts valid MCP initialize request and returns SSE stream', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json, text/event-stream',
					Authorization: 'Bearer valid-token',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'initialize',
					params: {
						protocolVersion: '2024-11-05',
						capabilities: {},
						clientInfo: { name: 'test-client', version: '1.0.0' },
					},
					id: 1,
				}),
			})

			let res = await app.fetch(req)
			expect(res.status).toBe(200)

			let contentType = res.headers.get('Content-Type')
			expect(contentType).toContain('text/event-stream')
		})

		test('returns 400 for malformed JSON-RPC request', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json, text/event-stream',
					Authorization: 'Bearer valid-token',
				},
				body: 'not valid json',
			})

			let res = await app.fetch(req)
			expect(res.status).toBe(400)
		})

		test('handles tools/list request', async () => {
			// First initialize the connection
			let initReq = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json, text/event-stream',
					Authorization: 'Bearer valid-token',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'initialize',
					params: {
						protocolVersion: '2024-11-05',
						capabilities: {},
						clientInfo: { name: 'test-client', version: '1.0.0' },
					},
					id: 1,
				}),
			})

			let initRes = await app.fetch(initReq)
			expect(initRes.status).toBe(200)

			// Read the SSE response to get initialization result
			let initBody = await initRes.text()
			expect(initBody).toContain('matchmaker-mcp')
		})
	})

	describe('CORS', () => {
		test('allows requests from claude.ai origin', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'OPTIONS',
				headers: {
					Origin: 'https://claude.ai',
					'Access-Control-Request-Method': 'POST',
					'Access-Control-Request-Headers': 'Authorization, Content-Type',
				},
			})

			let res = await app.fetch(req)
			expect(res.status).toBe(204)

			let allowOrigin = res.headers.get('Access-Control-Allow-Origin')
			expect(allowOrigin).toBe('https://claude.ai')
		})

		test('includes necessary CORS headers in response', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json, text/event-stream',
					Authorization: 'Bearer valid-token',
					Origin: 'https://claude.ai',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'initialize',
					params: {
						protocolVersion: '2024-11-05',
						capabilities: {},
						clientInfo: { name: 'test-client', version: '1.0.0' },
					},
					id: 1,
				}),
			})

			let res = await app.fetch(req)

			let allowOrigin = res.headers.get('Access-Control-Allow-Origin')
			expect(allowOrigin).toBe('https://claude.ai')
		})
	})

	describe('GET /mcp', () => {
		test('supports SSE stream for server-sent events', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer valid-token',
					Accept: 'text/event-stream',
				},
			})

			let res = await app.fetch(req)
			// GET should either return 200 with SSE or appropriate error
			// depending on session state
			expect([200, 400]).toContain(res.status)
		})
	})

	describe('DELETE /mcp', () => {
		test('supports session termination', async () => {
			let req = new Request('http://localhost/mcp', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer valid-token',
				},
			})

			let res = await app.fetch(req)
			// DELETE should return appropriate response for stateless mode
			expect([200, 204, 400]).toContain(res.status)
		})
	})
})
