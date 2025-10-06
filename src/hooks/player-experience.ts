import { useQuery } from '@tanstack/react-query'
import type { IPlayerExperienceService } from '@/services/get-player-experience'
import type { PlayerExperienceResponse } from '@/types/player-experience-response'

export const usePlayerExperience = (
	playerName: string,
	skillId: number,
	playerService: IPlayerExperienceService
) => {
	return useQuery<PlayerExperienceResponse>({
		queryKey: ['player-experience', playerName, skillId],
		queryFn: () =>
			playerService.getPlayerExperience({ name: playerName, skillId }),
	})
}
