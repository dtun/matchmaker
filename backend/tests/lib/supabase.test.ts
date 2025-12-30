import { describe, test, expect } from 'bun:test'
import { createSupabaseClient } from '../../src/lib/supabase'

describe('createSupabaseClient', () => {
	test('should create client with valid config', () => {
		let client = createSupabaseClient({
			url: 'http://localhost:54321',
			serviceRoleKey: 'test-service-role-key',
		})

		expect(client).toBeDefined()
		expect(client.auth).toBeDefined()
		expect(client.from).toBeDefined()
	})

	test('should throw error if URL missing', () => {
		expect(() => {
			createSupabaseClient({
				url: '',
				serviceRoleKey: 'test-key',
			})
		}).toThrow()
	})

	test('should throw error if service role key missing', () => {
		expect(() => {
			createSupabaseClient({
				url: 'http://localhost:54321',
				serviceRoleKey: '',
			})
		}).toThrow()
	})
})
