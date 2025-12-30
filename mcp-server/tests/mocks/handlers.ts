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
				id: 'test-uuid',
				name: body.name,
				matchmaker_id: 'user-uuid',
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
				id: 'person-1',
				name: 'Alice',
				matchmaker_id: 'user-uuid',
				active: true,
			},
		])
	}),
]
