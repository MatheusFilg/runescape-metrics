import { useQuery } from '@tanstack/react-query'
import type { IPlayerService } from '@/services/get-player-summary'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export function usePlayerSearch(
	searchTerm: string,
	playerService: IPlayerService
) {
	return useQuery<PlayerSummaryResponse>({
		queryKey: ['player-search', searchTerm],
		queryFn: () => playerService.getPlayerSummary({ name: searchTerm }),
		enabled: !!searchTerm.trim(),
	})
}
