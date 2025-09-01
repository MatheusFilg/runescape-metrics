import type { IPlayerService } from '@/services/get-player-details'
import { mockData } from './mock-schema-player-summary'

export const successfulPlayerSummaryModel: IPlayerService = {
	getPlayerSummary: () => Promise.resolve(mockData),
}

export const failedPlayerSummaryModel: IPlayerService = {
	getPlayerSummary: () => Promise.reject(new Error('Player not found')),
}
