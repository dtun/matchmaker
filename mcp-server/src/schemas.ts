import { z } from 'zod'

export const personResponseSchema = z
	.object({
		id: z.string().uuid(),
		matchmaker_id: z.string().uuid(),
		name: z.string(),
		age: z.number().nullable(),
		location: z.string().nullable(),
		gender: z.string().nullable(),
		preferences: z.record(z.unknown()).nullable(),
		personality: z.record(z.unknown()).nullable(),
		notes: z.string().nullable(),
		active: z.boolean(),
		created_at: z.string(),
		updated_at: z.string(),
	})
	.passthrough()

export const peopleListResponseSchema = z.array(personResponseSchema)
