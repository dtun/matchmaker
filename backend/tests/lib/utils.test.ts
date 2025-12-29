import { describe, test, expect } from 'bun:test'
import { sum } from '../../src/lib/utils'

describe('sum', () => {
	test('should add two positive numbers', () => {
		let result1 = sum(1, 2)
		let result2 = sum(10, 20)
		expect(result1).toBe(3)
		expect(result2).toBe(30)
	})

	test('should add negative numbers', () => {
		let result1 = sum(-1, -2)
		let result2 = sum(-5, 3)
		expect(result1).toBe(-3)
		expect(result2).toBe(-2)
	})

	test('should handle zero', () => {
		let result1 = sum(0, 0)
		let result2 = sum(5, 0)
		let result3 = sum(0, 5)
		expect(result1).toBe(0)
		expect(result2).toBe(5)
		expect(result3).toBe(5)
	})
})
