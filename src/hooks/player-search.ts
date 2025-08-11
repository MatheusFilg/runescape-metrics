import { useQuery } from '@tanstack/react-query'
import { getPlayerDetails } from '@/services/get-player-details'
import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export const usePlayerSearch = (searchTerm: string) => {
	return useQuery<PlayerSummaryResponse>({
		queryKey: ['playerSearch', searchTerm],
		queryFn: () => getPlayerDetails({ name: searchTerm }),
		enabled: !!searchTerm.trim(),
		staleTime: 5 * 60 * 1000,
	})
}
