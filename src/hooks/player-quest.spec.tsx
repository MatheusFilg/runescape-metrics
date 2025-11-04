import { waitFor } from '@testing-library/react'
import { PlayerQuestsService } from '@/services/get-player-quests'
import { httpClientMock } from '@/test/mocks/http-client-mock'
import { mockPlayerQuestsData } from '@/test/mocks/mock-schema-player-quests'
import { renderQueryClient } from '@/test/render-query-client'
import { usePlayerQuests } from './player-quests'

describe('Player Quests Hook', () => {
	it('should not execute with empty string parameter', async () => {
		const clientMock = httpClientMock(() => mockPlayerQuestsData)
		const playerQuestsService = new PlayerQuestsService(clientMock)

		const { result } = renderQueryClient(() =>
			usePlayerQuests('', playerQuestsService)
		)

		expect(result.current.isFetching).toBe(false)
		expect(clientMock.sendRequest).not.toHaveBeenCalled()

		await waitFor(() => {
			expect(result.current.data).toBeUndefined()
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should return the correct info using a player name on request', async () => {
		const clientMock = httpClientMock(() => mockPlayerQuestsData)

		const playerQuestsService = new PlayerQuestsService(clientMock)

		const { result } = renderQueryClient(() =>
			usePlayerQuests('Ageonn', playerQuestsService)
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
			expect(result.current.data).toBe(mockPlayerQuestsData)
		})
	})
})
