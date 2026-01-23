import { Hono } from 'hono'
import type { Context } from 'hono'

// Helper to get base URL respecting proxy headers (e.g., Railway, Cloudflare)
let getBaseUrl = (c: Context): string => {
	let url = new URL(c.req.url)
	let proto = c.req.header('X-Forwarded-Proto') || url.protocol.replace(':', '')
	let host = c.req.header('X-Forwarded-Host') || url.host
	return `${proto}://${host}`
}

export let createWellKnownRoutes = (): Hono => {
	let app = new Hono()

	app.get('/oauth-authorization-server', c => {
		let baseUrl = getBaseUrl(c)

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
		let baseUrl = getBaseUrl(c)

		// RFC 9728 requires authorization_servers to be array of objects with issuer field
		return c.json({
			resource: baseUrl,
			authorization_servers: [{ issuer: baseUrl }],
		})
	})

	return app
}
