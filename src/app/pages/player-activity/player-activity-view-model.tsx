import { HttpClient } from '@/infra/http-client'
import { PlayerService } from '@/services/get-player-summary'
import { usePlayerActivityModel } from './player-activity-model'
import { PlayerActivityView } from './player-activity-view'

export function PlayerActivity() {
	const httpClient = HttpClient.create()
	const playerService = new PlayerService(httpClient)

	const methods = usePlayerActivityModel(playerService)
	return <PlayerActivityView {...methods} />
}
