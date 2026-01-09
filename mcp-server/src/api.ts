import { z } from 'zod'
import type { Config } from './config'
import { personResponseSchema, peopleListResponseSchema } from './schemas'

let addPersonInputSchema = z.object({
	name: z.string().min(1, 'Name is required'),
})

let getPersonInputSchema = z.object({
	id: z.string().min(1, 'ID is required'),
})

export interface Person {
	id: string
	name: string
	matchmaker_id: string
	age?: number | null
	location?: string | null
	gender?: string | null
	preferences?: object | null
	personality?: object | null
	notes?: string | null
	active: boolean
	created_at: string
	updated_at: string
}

export class ApiClient {
	constructor(private config: Config) {}

	private async parseResponse<T>(response: Response, schema: z.ZodSchema<T>): Promise<T> {
		let data: unknown
		try {
			data = await response.json()
		} catch (e) {
			throw new Error(`Failed to parse JSON: ${e instanceof Error ? e.message : 'Unknown error'}`)
		}

		try {
			return schema.parse(data)
		} catch (e) {
			if (e instanceof z.ZodError) {
				throw new Error(`API response validation failed: ${e.errors[0]?.message}`)
			}
			throw e
		}
	}

	async addPerson(name: string): Promise<Person> {
		// Validate input
		addPersonInputSchema.parse({ name })

		let response = await fetch(`${this.config.api_base_url}/api/people`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.config.auth_token}`,
			},
			body: JSON.stringify({ name }),
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return this.parseResponse(response, personResponseSchema)
	}

	async listPeople(): Promise<Person[]> {
		let response = await fetch(`${this.config.api_base_url}/api/people`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.config.auth_token}`,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return this.parseResponse(response, peopleListResponseSchema)
	}

	async getPerson(id: string): Promise<Person> {
		// Validate input
		getPersonInputSchema.parse({ id })

		let response = await fetch(`${this.config.api_base_url}/api/people/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.config.auth_token}`,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return this.parseResponse(response, personResponseSchema)
	}
}
