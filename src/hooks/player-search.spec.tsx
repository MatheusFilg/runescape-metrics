import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PlayerService } from '@/services/get-player-details'
import { httpClientMock } from '@/test/mocks/http-client-mock'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'
import { usePlayerSearch } from './player-search'

const mockPlayerData: PlayerSummaryResponse = {
	name: 'Ageonn',
	combatlevel: 121,
	magic: 1073577,
	totalskill: 2231,
	questsstarted: 9,
	questscomplete: 183,
	questsnotstarted: 160,
	totalxp: 64503963,
	ranged: 5354104,
	rank: '308,300',
	melee: 34254979,
	loggedIn: 'false',
	skillvalues: [
		{
			level: 90,
			xp: 53541049,
			rank: 389096,
			id: 3,
			percentageProgress: '35.01',
			xpToNextLevel: 90248,
		},
	],
	activities: [
		{
			date: '15-Aug-2025 13:30',
			details: 'I killed  the shapeshifting elven hunter, Helwyr.',
			text: 'I killed  Helwyr.',
			activityType: 'bossKills',
			activityUrl: 'https://runescape.wiki/images/Combat_icon_large.png',
		},
	],
}

const clientWrapper = () => {
	const queryClient = new QueryClient()
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

describe('PlayerSearch Hook', () => {
	describe('usePlayerSearch', () => {
		it('should not execute with empty string parameter', async () => {
			const clientMock = httpClientMock(() => mockPlayerData)

			const playerService = new PlayerService(clientMock)

			const { result } = renderHook(() => usePlayerSearch('', playerService), {
				wrapper: clientWrapper(),
			})

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
				return { ...mockPlayerData, name: request.params?.name }
			})

			const playerService = new PlayerService(clientMock)

			const { result } = renderHook(
				() => usePlayerSearch(searchTerm, playerService),
				{ wrapper: clientWrapper() }
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
