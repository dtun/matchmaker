import { mock } from 'bun:test'
import type { SupabaseClient } from '../../src/lib/supabase'

export let createMockSupabaseClient = (overrides: any = {}): SupabaseClient => {
	let defaultMock = {
		auth: {
			getUser: mock(async (token: string) => ({
				data: { user: { id: 'test-user-id' } },
				error: null,
			})),
		},
		from: mock((table: string) => ({
			select: mock((columns: string = '*') => ({
				eq: mock((column: string, value: any) => ({
					data: [],
					error: null,
				})),
				single: mock(() => ({
					data: null,
					error: null,
				})),
				data: [],
				error: null,
			})),
			insert: mock((data: any) => ({
				select: mock(() => ({
					single: mock(() => ({
						data: null,
						error: null,
					})),
					data: null,
					error: null,
				})),
				data: null,
				error: null,
			})),
			update: mock((data: any) => ({
				eq: mock((column: string, value: any) => ({
					data: null,
					error: null,
				})),
				data: null,
				error: null,
			})),
			delete: mock(() => ({
				eq: mock((column: string, value: any) => ({
					data: null,
					error: null,
				})),
				data: null,
				error: null,
			})),
		})),
	}

	// Deep merge overrides with default mock
	return {
		...defaultMock,
		...overrides,
		auth: {
			...defaultMock.auth,
			...(overrides.auth || {}),
		},
	} as unknown as SupabaseClient
}
