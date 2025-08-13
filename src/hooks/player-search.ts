import { useQuery } from '@tanstack/react-query'
import type { IPlayerService } from '@/services/get-player-details'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export const usePlayerSearch = (
	searchTerm: string,
	playerService: IPlayerService
) => {
	return useQuery<PlayerSummaryResponse>({
		queryKey: ['playerSearch', searchTerm],
		queryFn: () => playerService.getPlayerSummary({ name: searchTerm }),
		enabled: !!searchTerm.trim(),
		staleTime: 5 * 60 * 1000,
	})
}
