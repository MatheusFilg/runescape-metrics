import { useQuery } from '@tanstack/react-query'
import type { PlayerSummaryResponse } from '@/app/pages/player-summary/types/player-summary-response'
import type { IPlayerService } from '@/services/get-player-details'

export const usePlayerSearch = (
	searchTerm: string,
	playerService: IPlayerService
) => {
	return useQuery<PlayerSummaryResponse>({
		queryKey: ['playerSearch', searchTerm],
		queryFn: () => playerService.getPlayerSummary({ name: searchTerm }),
		enabled: !!searchTerm.trim(),
	})
}
