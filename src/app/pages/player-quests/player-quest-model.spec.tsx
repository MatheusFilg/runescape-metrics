import { waitFor } from '@testing-library/react'
import { act } from 'react'
import { vi } from 'vitest'
import { mockPlayerQuestsData } from '@/test/mocks/mock-schema-player-quests'
import {
	failedPlayerQuestsModel,
	successfulPlayerQuestsModel,
} from '@/test/mocks/services/player-quests-service-mock'
import { renderQueryClient } from '@/test/render-query-client'
import type { PlayerQuestResponse } from '@/types/player-quests-response'
import { usePlayerQuestModel } from './player-quest-model'

vi.mock('nuqs', () => ({
	useQueryState: vi.fn().mockReturnValue(['Ageonn', vi.fn()]),
}))

describe('Player Quest Model', () => {
	it('should return player quests page', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerQuestModel(successfulPlayerQuestsModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data).toEqual(mockPlayerQuestsData)
	})

	it('should set loading to true while fetching', async () => {
		const loadingMockService = {
			getPlayerQuests: vi.fn(() => {
				return new Promise<PlayerQuestResponse>(resolve => {
					setTimeout(() => resolve(mockPlayerQuestsData), 100)
				})
			}),
		}

		const { result } = renderQueryClient(() =>
			usePlayerQuestModel(loadingMockService)
		)

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should handle error state', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerQuestModel(failedPlayerQuestsModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data).toBeUndefined()
	})

	it('should filter the currently quests', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerQuestModel(successfulPlayerQuestsModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.filteredQuests).toHaveLength(
			mockPlayerQuestsData.quests.length
		)
		expect(result.current.filteredQuests).toEqual(mockPlayerQuestsData.quests)

		act(() => {
			result.current.setInputValue('A fairy')
		})

		const expectedQuests = mockPlayerQuestsData.quests.filter(quest =>
			quest.title
				.toLowerCase()
				.includes(result.current.inputValue.toLowerCase())
		)
		expect(result.current.inputValue).toBe('A fairy')
		expect(result.current.filteredQuests).toHaveLength(2)
		expect(result.current.filteredQuests).toEqual(expectedQuests)
	})

	it('should have the url properties in the data quests', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerQuestModel(successfulPlayerQuestsModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const filteredQuests = result.current.filteredQuests

		expect(filteredQuests).toBeDefined()

		if (filteredQuests && filteredQuests.length > 0) {
			expect(filteredQuests[0]).toHaveProperty('urlQuestQuickGuide')
			expect(filteredQuests[0]).toHaveProperty('urlQuestIcon')
			expect(filteredQuests[0]).toHaveProperty('urlQuestReward')
		}
	})
})
