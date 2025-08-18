import { describe, expect, it } from 'vitest'
import { HttpMethod } from '@/infra/http-client-player'
import { httpClientMock } from '@/mocks/http-client-mock'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'
import { PlayerService } from './get-player-details'

const mockPlayerData = (name: string): PlayerSummaryResponse => ({
	name: `${name}`,
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
	skillvalues: [{ level: 90, xp: 53541049, rank: 389096, id: 3 }],
	activities: [
		{
			date: '15-Aug-2025 13:30',
			details: 'I killed  the shapeshifting elven hunter, Helwyr.',
			text: 'I killed  Helwyr.',
			activityType: 'bossKills',
			activityUrl: 'https://runescape.wiki/images/Combat_icon_large.png',
		},
	],
})

describe('PlayerService', () => {
	describe('getPlayerSummary', () => {
		it('should request correct Http with default parameters', async () => {
			const clientMock = httpClientMock(request => {
				const playerName = request.params?.name

				return mockPlayerData(playerName)
			})

			const service = new PlayerService(clientMock)

			const result = await service.getPlayerSummary({ name: 'Ageonn' })

			expect(clientMock.sendRequest).toHaveBeenCalledWith({
				method: HttpMethod.GET,
				endpoint: '/player-details',
				params: { name: 'Ageonn', activities: 20 },
			})

			expect(result).toEqual(mockPlayerData('Ageonn'))
			expect(result.name).toBe('Ageonn')
		})

		it('should return different data for different players', async () => {
			const clientMock = httpClientMock(request =>
				mockPlayerData(request.params?.name)
			)
			const service = new PlayerService(clientMock)

			const result1 = await service.getPlayerSummary({ name: 'Ageonn' })
			const result2 = await service.getPlayerSummary({ name: 'Maggyxz' })

			expect(result1.name).toBe('Ageonn')
			expect(result2.name).toBe('Maggyxz')
			expect(result1).not.toEqual(result2)
		})
	})
})
