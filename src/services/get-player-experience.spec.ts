import { HttpMethod } from '@/infra/http-client-player'
import {
	httpClientMock,
	httpClientMockWithFailure,
} from '@/test/mocks/http-client-mock'
import type { PlayerExperienceResponse } from '@/types/player-experience-response'
import { PlayerExperienceService } from './get-player-experience'

interface MockPlayerExperienceResponse extends PlayerExperienceResponse {
	name: string
}

const mockPlayerData = (name: string): MockPlayerExperienceResponse => ({
	name: `${name}`,
	monthlyXpGain: [
		{
			skillId: -1,
			totalXp: 113132758,
			averageXpGain: 9427502,
			totalGain: 113130029,
			monthData: [
				{ xpGain: 0, timestamp: 1731073621025, rank: 0 },
				{ xpGain: 0, timestamp: 1733665621025, rank: 0 },
				{ xpGain: 0, timestamp: 1736344021025, rank: 0 },
				{ xpGain: 0, timestamp: 1739022421025, rank: 0 },
				{ xpGain: 0, timestamp: 1741441621025, rank: 0 },
				{ xpGain: 0, timestamp: 1744116421025, rank: 0 },
				{ xpGain: 0, timestamp: 1746708421025, rank: 0 },
				{ xpGain: 9538322, timestamp: 1751302609209, rank: 68469 },
				{ xpGain: 28482494, timestamp: 1753979015178, rank: 30813 },
				{ xpGain: 50094831, timestamp: 1756640806124, rank: 21331 },
				{ xpGain: 25005608, timestamp: 1759118622643, rank: 35581 },
				{ xpGain: 8774, timestamp: 1759848466869, rank: 124110 },
			],
		},
	],
	loggedIn: 'false',
})

describe('Player Experience Service', () => {
	describe('getPlayerExperienceSummary', () => {
		it('should request correct Http with default parameters', async () => {
			const clientMock = httpClientMock(request => {
				const playerName = request.params?.name

				return mockPlayerData(playerName)
			})

			const service = new PlayerExperienceService(clientMock)

			const result = await service.getPlayerExperience({ name: 'Ageonn' })

			expect(clientMock.sendRequest).toHaveBeenCalledWith({
				method: HttpMethod.GET,
				endpoint: '/player-experience',
				params: { name: 'Ageonn', skillId: -1 },
			})

			expect(result).toEqual(mockPlayerData('Ageonn'))
		})

		it('should return different data for different players', async () => {
			const clientMock = httpClientMock(request =>
				mockPlayerData(request.params?.name)
			)
			const service = new PlayerExperienceService(clientMock)

			const result1 = await service.getPlayerExperience({ name: 'Ageonn' })
			const result2 = await service.getPlayerExperience({ name: 'Maggyxz' })

			expect(result1).not.toEqual(result2)
		})

		it('should throw a error if the request fails', async () => {
			const mockError = new Error('Api failure: Internal server error')

			const clientMock = httpClientMockWithFailure(mockError)

			const service = new PlayerExperienceService(clientMock)

			await expect(
				service.getPlayerExperience({ name: 'Inexistent' })
			).rejects.toThrow('Api failure: Internal server error')
		})
	})
})
