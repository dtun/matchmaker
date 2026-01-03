import { http, HttpResponse } from 'msw'

let BASE_URL = 'http://localhost:3000'

export let handlers = [
	// POST /api/people - Success
	http.post(`${BASE_URL}/api/people`, async ({ request }) => {
		let auth = request.headers.get('Authorization')
		if (auth !== 'Bearer valid-token') {
			return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		let body = (await request.json()) as { name: string }
		return HttpResponse.json(
			{
				id: '550e8400-e29b-41d4-a716-446655440000',
				name: body.name,
				matchmaker_id: '123e4567-e89b-12d3-a456-426614174000',
				age: null,
				location: null,
				gender: null,
				preferences: null,
				personality: null,
				notes: null,
				active: true,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{ status: 201 }
		)
	}),

	// GET /api/people - Success
	http.get(`${BASE_URL}/api/people`, ({ request }) => {
		let auth = request.headers.get('Authorization')
		if (auth !== 'Bearer valid-token') {
			return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		return HttpResponse.json([
			{
				id: '660e8400-e29b-41d4-a716-446655440001',
				name: 'Alice',
				matchmaker_id: '123e4567-e89b-12d3-a456-426614174000',
				age: null,
				location: null,
				gender: null,
				preferences: null,
				personality: null,
				notes: null,
				active: true,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		])
	}),
]
