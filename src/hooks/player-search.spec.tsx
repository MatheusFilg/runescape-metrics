import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PlayerService } from '@/services/get-player-details'
import { httpClientMock } from '@/test/mocks/http-client-mock'
import { mockData } from '@/test/mocks/mock-schema-player-summary'
import { renderQueryClient } from '@/test/render-query-client'
import { usePlayerSearch } from './player-search'

describe('PlayerSearch Hook', () => {
	describe('usePlayerSearch', () => {
		it('should not execute with empty string parameter', async () => {
			const clientMock = httpClientMock(() => mockData)

			const playerService = new PlayerService(clientMock)

			const { result } = renderQueryClient(() =>
				usePlayerSearch('', playerService)
			)

			expect(result.current.isFetching).toBe(false)
			expect(clientMock.sendRequest).not.toHaveBeenCalled()

			await waitFor(() => {
				expect(result.current.data).toBeUndefined()
				expect(result.current.isLoading).toBe(false)
			})
		})

		it('should use searchTerm in request', async () => {
			const searchTerm = 'Ageonn'

			const clientMock = httpClientMock(request => {
				return { ...mockData, name: request.params?.name }
			})

			const playerService = new PlayerService(clientMock)

			const { result } = renderQueryClient(() =>
				usePlayerSearch(searchTerm, playerService)
			)

			await waitFor(() => {
				expect(result.current.isSuccess).toBe(true)
				expect(result.current.data?.name).toBe(searchTerm)
			})

			expect(clientMock.sendRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					params: {
						name: searchTerm,
						activities: 20,
					},
				})
			)
		})
	})
})
