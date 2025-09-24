import { act, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { mockData } from '@/test/mocks/mock-schema-player-summary'
import {
	failedPlayerActivityModel,
	successfulPlayerActivityModel,
} from '@/test/mocks/services/player-activity-service-mock'
import { renderQueryClient } from '@/test/render-query-client'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'
import { usePlayerActivityModel } from './player-activity-model'

vi.mock('nuqs', () => ({
	useQueryState: vi.fn().mockReturnValue(['Ageonn', vi.fn()]),
}))

describe('Player Activity Model', () => {
	it('should return player activity page', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerActivityModel(successfulPlayerActivityModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.playerActivitiesDetails).toEqual(mockData.activities)
	})

	it('should set loading to true while fetching', async () => {
		const loadingMockService = {
			getPlayerSummary: vi.fn(() => {
				return new Promise<PlayerSummaryResponse>(resolve => {
					setTimeout(() => resolve(mockData), 100)
				})
			}),
		}

		const { result } = renderQueryClient(() =>
			usePlayerActivityModel(loadingMockService)
		)

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should handle error state', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerActivityModel(failedPlayerActivityModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.playerActivitiesDetails).toBeUndefined()
	})

	it('should filter the activities of a player when the filter changes', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerActivityModel(successfulPlayerActivityModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		// Estado normal do filtro
		expect(result.current.activityFilter).toBe('all')
		expect(result.current.filteredActivities).toHaveLength(
			mockData.activities.length
		)
		expect(result.current.filteredActivities).toEqual(mockData.activities)

		// Mudança para a opção bossKills
		act(() => {
			result.current.setActivityFilter('bossKills')
		})

		const expectedBossKills = mockData.activities.filter(
			activity => activity.activityType === 'bossKills'
		)

		expect(result.current.activityFilter).toBe('bossKills')
		expect(result.current.filteredActivities).toHaveLength(1)
		expect(result.current.filteredActivities).toEqual(expectedBossKills)

		// Mudança para a opção leveling
		act(() => {
			result.current.setActivityFilter('leveling')
		})

		const expectedLeveling = mockData.activities.filter(
			a => a.activityType === 'leveling'
		)

		expect(result.current.activityFilter).toBe('leveling')
		expect(result.current.filteredActivities).toHaveLength(1)
		expect(result.current.filteredActivities).toEqual(expectedLeveling)

		// Voltando ao estado inicial
		act(() => {
			result.current.setActivityFilter('all')
		})

		expect(result.current.activityFilter).toBe('all')
		expect(result.current.filteredActivities).toHaveLength(
			mockData.activities.length
		)
		expect(result.current.filteredActivities).toEqual(mockData.activities)
	})
})
