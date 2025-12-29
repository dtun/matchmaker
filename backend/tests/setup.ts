import { beforeAll, afterAll } from 'bun:test'

// Global test setup
beforeAll(() => {
	console.log('Running backend test suite')
})

afterAll(() => {
	console.log('Backend tests completed')
})
