import { HttpMethod, type IHttpClient } from '@/infra/http-client-player'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export interface IPlayerService {
	getPlayerSummary: (params: {
		name: string
		activities?: number
	}) => Promise<PlayerSummaryResponse>
}

export class PlayerService implements IPlayerService {
	constructor(private readonly httpClient: IHttpClient) {}

	async getPlayerSummary({
		name,
		activities = 20,
	}: {
		name: string
		activities?: number
	}) {
		const responsePlayerSummary =
			await this.httpClient.sendRequest<PlayerSummaryResponse>({
				method: HttpMethod.GET,
				endpoint: '/player-details',
				params: { name, activities },
			})
		return responsePlayerSummary
	}
}
