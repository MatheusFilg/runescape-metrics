import { vi } from 'vitest'
import type { HttpRequest, IHttpClient } from '@/infra/http-client-player'

export const httpClientMock = (
	responseBuilder: (request: HttpRequest<any>) => any
): IHttpClient => ({
	sendRequest: vi.fn(async request => {
		const response = responseBuilder(request)
		return response
	}),
})

export const httpClientMockWithFailure = (error: Error): IHttpClient => ({
	sendRequest: vi.fn().mockRejectedValue(new Error(`Network error: ${error}`)),
})
