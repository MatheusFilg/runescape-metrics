import type { PlayerSummaryResponse } from '@/app/pages/player-summary/types/player-summary-response'
import { HttpMethod, type IHttpClient } from '@/infra/http-client-player'

export interface GetPlayerSummaryParams {
	name: string
	activities?: number
}

export interface IPlayerService {
	getPlayerSummary: (params: {
		name: string
		activities?: number
	}) => Promise<PlayerSummaryResponse>
}

export class PlayerService implements IPlayerService {
	constructor(private readonly httpClient: IHttpClient) {}

	async getPlayerSummary(params: GetPlayerSummaryParams) {
		const { name, activities = 20 } = params
		const responsePlayerSummary =
			await this.httpClient.sendRequest<PlayerSummaryResponse>({
				method: HttpMethod.GET,
				endpoint: '/player-details',
				params: { name, activities },
			})
		return responsePlayerSummary
	}
}
