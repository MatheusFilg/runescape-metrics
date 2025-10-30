import { HttpMethod, type IHttpClient } from '@/infra/http-client-player'
import type { PlayerQuestResponse } from '@/types/player-quests-response'

interface GetPlayerQuestsParams {
	user: string
}

export interface PlayerQuests {
	getPlayerQuests: (params: { user: string }) => Promise<PlayerQuestResponse>
}

export class PlayerQuestsService implements PlayerQuests {
	constructor(private readonly httpClient: IHttpClient) {}

	async getPlayerQuests(params: GetPlayerQuestsParams) {
		const { user } = params

		const responsePlayerQuests =
			await this.httpClient.sendRequest<PlayerQuestResponse>({
				method: HttpMethod.GET,
				endpoint: '/player-quests',
				params: { user },
			})
		return responsePlayerQuests
	}
}
