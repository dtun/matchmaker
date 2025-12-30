import { beforeAll, afterAll, afterEach } from 'bun:test'
import { server } from './mocks/server'

// Global test setup
beforeAll(() => {
	server.listen({ onUnhandledRequest: 'error' })
	console.log('Running MCP server test suite')
})

afterEach(() => {
	server.resetHandlers()
})

afterAll(() => {
	server.close()
	console.log('MCP server tests completed')
})
