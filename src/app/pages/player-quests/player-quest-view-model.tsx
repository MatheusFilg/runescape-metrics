import { HttpClient } from '@/infra/http-client'
import { PlayerQuestsService } from '@/services/get-player-quests'
import { usePlayerQuestModel } from './player-quest-model'
import { PlayerQuestsView } from './player-quests-view'

export function PlayerQuests() {
	const httpClient = HttpClient.create()
	const playerQuests = new PlayerQuestsService(httpClient)

	const methods = usePlayerQuestModel(playerQuests)
	return <PlayerQuestsView {...methods} />
}
