import { HttpMethod } from '@/infra/http-client-player'
import {
	httpClientMock,
	httpClientMockWithFailure,
} from '@/test/mocks/http-client-mock'
import { mockPlayerQuestsData } from '@/test/mocks/mock-schema-player-quests'
import { PlayerQuestsService } from './get-player-quests'

describe('Player Quests Service', () => {
	it('should request correct Http with default parameters', async () => {
		const clientMock = httpClientMock(() => mockPlayerQuestsData)

		const playerQuestsService = new PlayerQuestsService(clientMock)

		const result = await playerQuestsService.getPlayerQuests({ user: 'Ageonn' })

		expect(clientMock.sendRequest).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			endpoint: '/player-quests',
			params: { user: 'Ageonn' },
		})

		expect(result).toEqual(mockPlayerQuestsData)
	})

	it('should return different data for different players', async () => {
		const clientMock = httpClientMock(request => {
			return { ...mockPlayerQuestsData, user: request.params?.user }
		})
		const playerQuestsService = new PlayerQuestsService(clientMock)

		const result1 = await playerQuestsService.getPlayerQuests({
			user: 'Ageonn',
		})
		const result2 = await playerQuestsService.getPlayerQuests({
			user: 'Maggyxz',
		})

		expect(result1).not.toEqual(result2)
	})

	it('should throw a error if the request fails', async () => {
		const mockError = new Error('Api failure: Internal server error')

		const clientMock = httpClientMockWithFailure(mockError)

		const playerQuestsService = new PlayerQuestsService(clientMock)

		await expect(
			playerQuestsService.getPlayerQuests({ user: 'Inexistent' })
		).rejects.toThrow('Api failure: Internal server error')
	})
})
