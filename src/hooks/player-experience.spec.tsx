import { waitFor } from '@testing-library/react'
import { PlayerExperienceService } from '@/services/get-player-experience'
import { httpClientMock } from '@/test/mocks/http-client-mock'
import { mockExperienceData } from '@/test/mocks/mock-schema-player-experience'
import { renderQueryClient } from '@/test/render-query-client'
import { usePlayerExperience } from './player-experience'

describe('Player Experience Hook', () => {
	it('should not execute with empty string parameter', async () => {
		const clientMock = httpClientMock(() => mockExperienceData)

		const playerExperienceService = new PlayerExperienceService(clientMock)
		const { result } = renderQueryClient(() =>
			usePlayerExperience('', -1, playerExperienceService)
		)

		expect(result.current.isFetching).toBe(false)
		expect(clientMock.sendRequest).not.toHaveBeenCalled()

		await waitFor(() => {
			expect(result.current.data).toBeUndefined()
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should return the correct info using a player name on request', async () => {
		const clientMock = httpClientMock(() => mockExperienceData)

		const playerExperienceService = new PlayerExperienceService(clientMock)

		const { result } = renderQueryClient(() =>
			usePlayerExperience('Ageonn', -1, playerExperienceService)
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
			expect(result.current.data).toBe(mockExperienceData)
		})
	})
})
