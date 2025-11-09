import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { mockData } from '@/test/mocks/mock-schema-player-summary'
import {
	failedPlayerSummaryModel,
	successfulPlayerSummaryModel,
} from '@/test/mocks/services/player-summary-service-mock'
import { renderQueryClient } from '@/test/render-query-client'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'
import { usePlayerSummaryModel } from './player-summary-model'

vi.mock('nuqs', () => ({
	useQueryState: vi.fn().mockReturnValue(['Ageonn', vi.fn()]),
}))

describe('Player Summary Model', () => {
	it('should return player summary page', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerSummaryModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.playerSummary).toEqual(mockData)
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
			usePlayerSummaryModel(loadingMockService)
		)

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should handle error state', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerSummaryModel(failedPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.playerSummary).toBeUndefined()
	})

	it('should transform skillValues correctly', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerSummaryModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const skillValuesResult = result.current.skillValues

		expect(skillValuesResult).toBeDefined()

		if (skillValuesResult && skillValuesResult.length > 0) {
			expect(skillValuesResult[0]).toHaveProperty('name')
			expect(skillValuesResult[0]).toHaveProperty('url')
			expect(skillValuesResult[0]).toHaveProperty('order')
		}
	})

	it('should sort skill values by ascending order', async () => {
		const mockService = {
			getPlayerSummary: vi.fn().mockResolvedValue(mockData),
		}

		const { result } = renderQueryClient(() =>
			usePlayerSummaryModel(mockService)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const skillValuesResult = result.current.skillValues
		expect(skillValuesResult).toBeDefined()

		if (skillValuesResult && skillValuesResult.length > 1) {
			for (let i = 1; i < skillValuesResult.length; i++) {
				expect(skillValuesResult[i].order).toBeGreaterThanOrEqual(
					skillValuesResult[i - 1].order
				)
			}
		}
	})
})
