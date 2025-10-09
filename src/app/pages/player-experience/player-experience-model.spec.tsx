import { act, waitFor } from '@testing-library/react'
import dayjs from 'dayjs'
import { vi } from 'vitest'
import { mockExperienceData } from '@/test/mocks/mock-schema-player-experience'
import {
	emptyPlayerExperienceModel,
	failedPlayerExperienceModel,
	incompletePlayerExperienceModel,
	successfulPlayerExperienceModel,
} from '@/test/mocks/services/player-experience-service-mock'
import { renderQueryClient } from '@/test/render-query-client'
import type { PlayerExperienceResponse } from '@/types/player-experience-response'
import { usePlayerExperienceModel } from './player-experience-model'

vi.mock('nuqs', () => ({
	useQueryState: vi.fn().mockReturnValue(['Ageonn', vi.fn()]),
}))

describe('Player Experience Model', () => {
	it('should return player experience page', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(successfulPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data).toEqual(mockExperienceData)
	})

	it('should set loading to true while fetching', async () => {
		const loadingMockService = {
			getPlayerExperience: vi.fn(() => {
				return new Promise<PlayerExperienceResponse>(resolve => {
					setTimeout(() => resolve(mockExperienceData), 100)
				})
			}),
		}
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(loadingMockService)
		)

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should handle error state', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(failedPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data).toBeUndefined()
	})

	it('should have the correct properties in chartData', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(successfulPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const chartData = result.current.chartData

		expect(chartData).toBeDefined()

		if (chartData && chartData.length > 0) {
			expect(chartData[0]).toHaveProperty('monthName')
			expect(chartData[0]).toHaveProperty('rank')
			expect(chartData[0]).toHaveProperty('timestamp')
			expect(chartData[0]).toHaveProperty('xpGain')
		}
	})

	it('should filter the skill chart correctly when the filter changes', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(successfulPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.selectedSkillId).toBe(-1)
		expect(result.current.chartData).toHaveLength(
			mockExperienceData.monthlyXpGain[0].monthData.length
		)
		expect(result.current.data?.monthlyXpGain[0].monthData).toEqual(
			mockExperienceData.monthlyXpGain[0].monthData
		)

		act(() => {
			result.current.setSelectedSkillId(1)
		})

		await waitFor(() => {
			expect(result.current.chartData.length).toBeGreaterThan(0)
		})

		expect(result.current.selectedSkillId).toBe(1)

		expect(result.current.data).toEqual(mockExperienceData)

		const expectedSkillId = mockExperienceData.monthlyXpGain.find(
			experience => experience.skillId === 1
		)?.monthData

		expect(result.current.chartData[0]).toHaveProperty('monthName')
		expect(result.current.chartData).toHaveLength(expectedSkillId?.length || 0)
		expect(result.current.chartData[0].xpGain).toBe(expectedSkillId?.[0].xpGain)
	})

	it('should return an empty chartData if monthlyXpGain is an empty array', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(emptyPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.chartData).toEqual([])
	})

	it('should return an empty chartData if the selected skill has no monthData', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(incompletePlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.chartData).toEqual([])

		act(() => {
			result.current.setSelectedSkillId(1)
		})

		expect(result.current.chartData).toEqual([])
	})

	it('should format the timestamp correctly into monthName', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerExperienceModel(successfulPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		act(() => {
			result.current.setSelectedSkillId(1)
		})

		await waitFor(() => {
			expect(result.current.chartData.length).toBeGreaterThan(0)
		})

		const firstMonthData = mockExperienceData.monthlyXpGain.find(
			skill => skill.skillId === 1
		)?.monthData[0]

		const expectMonthName = dayjs(firstMonthData?.timestamp).format('MMM')

		expect(result.current.chartData[0].monthName).toBe(expectMonthName)
		expect(result.current.chartData[0].monthName).not.toBe('Dez')
	})

	it('should maintain referential stability for chartData when inputs are the same', async () => {
		const { result, rerender } = renderQueryClient(() =>
			usePlayerExperienceModel(successfulPlayerExperienceModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		act(() => {
			result.current.setSelectedSkillId(1)
		})

		const firstChartDataReference = result.current.chartData

		rerender()

		expect(result.current.chartData).toBe(firstChartDataReference)

		act(() => {
			result.current.setSelectedSkillId(-1)
		})

		expect(result.current.chartData).not.toBe(firstChartDataReference)
	})
})
