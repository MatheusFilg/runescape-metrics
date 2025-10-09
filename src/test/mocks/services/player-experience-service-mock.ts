import type { IPlayerExperienceService } from '@/services/get-player-experience'
import { mockExperienceData } from '../mock-schema-player-experience'

export const successfulPlayerExperienceModel: IPlayerExperienceService = {
	getPlayerExperience: () => Promise.resolve(mockExperienceData),
}

export const failedPlayerExperienceModel: IPlayerExperienceService = {
	getPlayerExperience: () => Promise.reject(new Error('Player not found')),
}

export const emptyPlayerExperienceModel: IPlayerExperienceService = {
	getPlayerExperience: () =>
		Promise.resolve({ ...mockExperienceData, monthlyXpGain: [] }),
}

export const incompletePlayerExperienceModel: IPlayerExperienceService = {
	getPlayerExperience: () =>
		Promise.resolve({
			...mockExperienceData,
			monthlyXpGain: [
				{
					skillId: 1,
					totalXp: 1000,
					averageXpGain: 100,
					totalGain: 1000,
					monthData: [],
				},
			],
		}),
}
