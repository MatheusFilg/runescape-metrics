import { HttpMethod } from '@/infra/http-client-player'
import {
	httpClientMock,
	httpClientMockWithFailure,
} from '@/test/mocks/http-client-mock'
import { mockExperienceData } from '@/test/mocks/mock-schema-player-experience'
import { PlayerExperienceService } from './get-player-experience'

describe('Player Experience Service', () => {
	describe('getPlayerExperienceSummary', () => {
		it('should request correct Http with default parameters', async () => {
			const clientMock = httpClientMock(() => mockExperienceData)

			const service = new PlayerExperienceService(clientMock)

			const result = await service.getPlayerExperience({ name: 'Ageonn' })

			expect(clientMock.sendRequest).toHaveBeenCalledWith({
				method: HttpMethod.GET,
				endpoint: '/player-experience',
				params: { name: 'Ageonn', skillId: -1 },
			})

			expect(result.monthlyXpGain).toEqual(mockExperienceData.monthlyXpGain)
		})

		it('should return different data for different players', async () => {
			const clientMock = httpClientMock(request => {
				return { ...mockExperienceData, name: request.params?.name }
			})
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
