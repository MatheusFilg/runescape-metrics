import { HttpClient } from '@/infra/http-client'
import { PlayerExperienceService } from '@/services/get-player-experience'
import { PlayerExperienceView } from './player-experience'
import { usePlayerExperienceModel } from './player-experience-model'

export const PlayerExperience = () => {
	const httpClient = HttpClient.create()
	const playerExperienceService = new PlayerExperienceService(httpClient)

	const methods = usePlayerExperienceModel(playerExperienceService)

	return <PlayerExperienceView {...methods} />
}
