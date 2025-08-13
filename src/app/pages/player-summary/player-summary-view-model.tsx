import { PlayerService } from '@/services/get-player-details'
import { usePlayerSummaryModel } from './player-summary-model'
import { PlayerSummaryView } from './player-summary-view'

export function PlayerSummary() {
	const playerService = new PlayerService()
	const methods = usePlayerSummaryModel({ playerService })
	return <PlayerSummaryView {...methods} />
}
