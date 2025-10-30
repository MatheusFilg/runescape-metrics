import { useQuery } from '@tanstack/react-query'
import type { PlayerQuests } from '@/services/get-player-quests'
import type { PlayerQuestResponse } from '@/types/player-quests-response'

export const usePlayerQuests = (
	playerName: string,
	playerService: PlayerQuests
) => {
	return useQuery<PlayerQuestResponse>({
		queryKey: ['player-quests', playerName],
		queryFn: () => playerService.getPlayerQuests({ user: playerName }),
	})
}
