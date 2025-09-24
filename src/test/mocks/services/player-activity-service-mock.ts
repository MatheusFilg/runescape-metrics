import type { IPlayerService } from '@/services/get-player-details'
import { mockData } from '../mock-schema-player-summary'

export const successfulPlayerActivityModel: IPlayerService = {
	getPlayerSummary: () => Promise.resolve(mockData),
}

export const failedPlayerActivityModel: IPlayerService = {
	getPlayerSummary: () =>
		Promise.reject(new Error('Player activities not found')),
}
