import { act, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { mockData } from '@/test/mocks/mock-schema-player-summary'
import {
	failedPlayerSummaryModel,
	successfulPlayerSummaryModel,
} from '@/test/mocks/services/player-summary-service-mock'
import { renderQueryClient } from '@/test/render-query-client'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'
import { usePlayerLevelsModel } from './player-levels-model'

vi.mock('nuqs', () => ({
	useQueryState: vi.fn().mockReturnValue(['Ageonn', vi.fn()]),
}))

describe('Player Levels Model', () => {
	it('should return player level page', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data?.skillvalues).toEqual(mockData.skillvalues)
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
			usePlayerLevelsModel(loadingMockService)
		)

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})
	})

	it('should handle error state', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(failedPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		expect(result.current.data?.skillvalues).toBeUndefined()
	})

	it('should have the correct properties in skillData', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const skillData = result.current.skillData

		expect(skillData).toBeDefined()

		if (skillData && skillData.length > 0) {
			expect(skillData[0]).toHaveProperty('percentageProgress')
			expect(skillData[0]).toHaveProperty('xpToNextLevel')
			expect(skillData[0]).toHaveProperty('image')
			expect(skillData[0]).toHaveProperty('name')
		}
	})

	it('should correctly merge skillReference details into skillData', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const { data, skillData } = result.current

		expect(skillData.length).toBe(data?.skillvalues.length)

		const originalSkill = data?.skillvalues.find(skill => skill.id === 3)
		const transformedSkill = skillData.find(skill => skill.id === 3)

		expect(transformedSkill).toBeDefined()
		expect(transformedSkill?.name).toBe('Constitution')
		expect(transformedSkill?.image).toBe(
			'https://runescape.wiki/images/Constitution-icon.png'
		)
		expect(transformedSkill?.level).toBe(originalSkill?.level)
		expect(transformedSkill?.xp).toBe(originalSkill?.xp)
	})

	it('should render player skills levels table', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const table = result.current.table

		expect(table).toBeDefined()
	})

	it('should sort the player skills level table correctly', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const table = result.current.table

		expect(table.getState().sorting).toEqual([])
		const firstSkillNameBeforeSort = table.getRowModel().rows[0].original.name
		expect(firstSkillNameBeforeSort).toBe('Constitution')

		act(() => {
			table.setSorting([{ id: 'skillName', desc: false }])
		})

		expect(table.getState().sorting).toEqual([{ id: 'skillName', desc: false }])
		const firstRowNameAfterSort = table.getRowModel().rows[0]?.original.name
		expect(firstRowNameAfterSort).toBe('Agility')

		act(() => {
			table.setSorting([{ id: 'skillName', desc: true }])
		})

		expect(table.getState().sorting).toEqual([{ id: 'skillName', desc: true }])
		const firstRowNameDescending = table.getRowModel().rows[0]?.original.name
		expect(firstRowNameDescending).toBe('Woodcutting')
	})

	it('should handle skills IDs not found in skillReferences', async () => {
		const dataWithWrongId = {
			...mockData,
			skillvalues: [
				...mockData.skillvalues,
				{
					id: 30,
					level: 10,
					xp: 127685,
					rank: 5230,
					percentageProgress: '10%',
					xpToNextLevel: 1000,
				},
			],
		}

		const serviceWithWrongId = {
			getPlayerSummary: vi.fn(() => {
				return new Promise<PlayerSummaryResponse>(resolve => {
					setTimeout(() => resolve(dataWithWrongId), 100)
				})
			}),
		}

		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(serviceWithWrongId)
		)

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		const wrongSkill = result.current.skillData.find(skill => skill.id === 30)

		expect(wrongSkill).toBeDefined()

		expect(wrongSkill?.name).toBeUndefined()
		expect(wrongSkill?.image).toBeUndefined()
		expect(wrongSkill?.level).toBe(10)
		expect(wrongSkill?.xp).toBe(127685)
	})

	it('should configure table columns with correct sorting properties', async () => {
		const { result } = renderQueryClient(() =>
			usePlayerLevelsModel(successfulPlayerSummaryModel)
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
		})

		const columns = result.current.table.getAllColumns()

		const iconCol = columns.find(column => column.id === 'icon')
		const skillNameCol = columns.find(column => column.id === 'skillName')
		const levelCol = columns.find(column => column.id === 'level')
		const progressCol = columns.find(
			column => column.id === 'percentageProgress'
		)

		expect(skillNameCol?.getCanSort()).toBe(true)
		expect(levelCol?.getCanSort()).toBe(true)
		expect(progressCol?.getCanSort()).toBe(true)

		expect(iconCol?.getCanSort()).toBe(false)
	})
})
