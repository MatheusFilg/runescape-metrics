import { api } from '@/lib/axios'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export interface IPlayerService {
	getPlayerSummary: (params: {
		name: string
		activities?: number
	}) => Promise<PlayerSummaryResponse>
}

export class PlayerService implements IPlayerService {
	async getPlayerSummary({
		name,
		activities = 20,
	}: {
		name: string
		activities?: number
	}) {
		const response = await api.get('/player-details', {
			params: { name, activities },
		})
		return response.data
	}
}
