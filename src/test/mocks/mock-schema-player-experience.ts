import type { PlayerExperienceResponse } from '@/types/player-experience-response'

export const mockExperienceData: PlayerExperienceResponse = {
	monthlyXpGain: [
		{
			skillId: -1,
			totalXp: 113132758,
			averageXpGain: 9427502,
			totalGain: 113130029,
			monthData: [
				{ xpGain: 0, timestamp: 1731073621025, rank: 0 },
				{ xpGain: 0, timestamp: 1733665621025, rank: 0 },
				{ xpGain: 0, timestamp: 1736344021025, rank: 0 },
				{ xpGain: 0, timestamp: 1739022421025, rank: 0 },
				{ xpGain: 0, timestamp: 1741441621025, rank: 0 },
				{ xpGain: 0, timestamp: 1744116421025, rank: 0 },
				{ xpGain: 0, timestamp: 1746708421025, rank: 0 },
				{ xpGain: 9538322, timestamp: 1751302609209, rank: 68469 },
				{ xpGain: 28482494, timestamp: 1753979015178, rank: 30813 },
				{ xpGain: 50094831, timestamp: 1756640806124, rank: 21331 },
				{ xpGain: 25005608, timestamp: 1759118622643, rank: 35581 },
				{ xpGain: 8774, timestamp: 1759848466869, rank: 124110 },
			],
		},
		{
			skillId: 1,
			totalXp: 1878762,
			averageXpGain: 156558,
			totalGain: 1878705,
			monthData: [
				{ xpGain: 0, timestamp: 1731078399017, rank: 0 },
				{ xpGain: 0, timestamp: 1736348799017, rank: 0 },
				{ xpGain: 0, timestamp: 1739027199017, rank: 0 },
				{ xpGain: 0, timestamp: 1741446399017, rank: 0 },
				{ xpGain: 0, timestamp: 1744121199017, rank: 0 },
				{ xpGain: 0, timestamp: 1746713199017, rank: 0 },
				{ xpGain: 421717, timestamp: 1753947432572, rank: 16786 },
				{ xpGain: 1382205, timestamp: 1756617295121, rank: 8930 },
				{ xpGain: 29176, timestamp: 1757222063222, rank: 49889 },
				{ xpGain: 0, timestamp: 1759932399017, rank: 0 },
			],
		},
	],
	loggedIn: 'false',
}
