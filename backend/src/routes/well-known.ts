import { Hono } from 'hono'

export let createWellKnownRoutes = (): Hono => {
	let app = new Hono()

	app.get('/oauth-authorization-server', c => {
		// Build base URL from request
		let url = new URL(c.req.url)
		let baseUrl = `${url.protocol}//${url.host}`

		return c.json({
			issuer: baseUrl,
			authorization_endpoint: `${baseUrl}/oauth/authorize`,
			token_endpoint: `${baseUrl}/oauth/token`,
			registration_endpoint: `${baseUrl}/register`,
			response_types_supported: ['code'],
			grant_types_supported: ['authorization_code', 'refresh_token'],
			code_challenge_methods_supported: ['S256'],
		})
	})

	app.get('/oauth-protected-resource', c => {
		// Build base URL from request
		let url = new URL(c.req.url)
		let baseUrl = `${url.protocol}//${url.host}`

		// RFC 9728 requires authorization_servers to be array of objects with issuer field
		return c.json({
			resource: baseUrl,
			authorization_servers: [{ issuer: baseUrl }],
		})
	})

	return app
}
