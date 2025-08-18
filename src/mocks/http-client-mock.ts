import { vi } from 'vitest'
import type { HttpRequest, IHttpClient } from '@/infra/http-client-player'

export const httpClientMock = (
	responseBuilder: (request: HttpRequest<any>) => any
): IHttpClient => ({
	sendRequest: vi.fn(async request => {
		try {
			const response = responseBuilder(request)
			return response
		} catch (error) {
			throw new Error(`Mock error ${error}`)
		}
	}),
})
