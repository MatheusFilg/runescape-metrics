import { HttpClient } from '@/infra/http-client'
import { PlayerService } from '@/services/get-player-details'
import { usePlayerSummaryModel } from './player-summary-model'
import { PlayerSummaryView } from './player-summary-view'

export function PlayerSummary() {
	const httpClient = HttpClient.create()
	const playerService = new PlayerService(httpClient)

	const methods = usePlayerSummaryModel(playerService)
	return <PlayerSummaryView {...methods} />
}
