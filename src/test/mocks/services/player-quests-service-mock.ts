import type { PlayerQuests } from '@/services/get-player-quests'
import { mockPlayerQuestsData } from '../mock-schema-player-quests'

export const successfulPlayerQuestsModel: PlayerQuests = {
	getPlayerQuests: () => Promise.resolve(mockPlayerQuestsData),
}

export const failedPlayerQuestsModel: PlayerQuests = {
	getPlayerQuests: () => Promise.reject(new Error('Player not found')),
}
