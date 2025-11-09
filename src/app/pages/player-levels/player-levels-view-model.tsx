import { HttpClient } from '@/infra/http-client'
import { PlayerService } from '@/services/get-player-summary'
import { usePlayerLevelsModel } from './player-levels-model'
import { PlayerLevelsView } from './player-levels-view'

export const PlayerLevels = () => {
	const httpClient = HttpClient.create()
	const playerService = new PlayerService(httpClient)

	const methods = usePlayerLevelsModel(playerService)

	return <PlayerLevelsView {...methods} />
}
