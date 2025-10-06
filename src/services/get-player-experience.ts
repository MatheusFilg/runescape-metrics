import { HttpMethod, type IHttpClient } from '@/infra/http-client-player'
import type { PlayerExperienceResponse } from '@/types/player-experience-response'

export interface GetPlayerExperienceParams {
	name: string
	skillId: number
}

export interface IPlayerExperienceService {
	getPlayerExperience: (params: {
		name: string
		skillId: number
	}) => Promise<PlayerExperienceResponse>
}

export class PlayerExperienceService implements IPlayerExperienceService {
	constructor(private readonly httpClient: IHttpClient) {}

	async getPlayerExperience(params: GetPlayerExperienceParams) {
		const { name, skillId = -1 } = params
		const responsePlayerExperience =
			await this.httpClient.sendRequest<PlayerExperienceResponse>({
				method: HttpMethod.GET,
				endpoint: '/player-experience',
				params: { name, skillId },
			})
		return responsePlayerExperience
	}
}
