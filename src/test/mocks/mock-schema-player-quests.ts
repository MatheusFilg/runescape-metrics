import type { PlayerQuestResponse } from '@/types/player-quests-response'

export const mockPlayerQuestsData: PlayerQuestResponse = {
	quests: [
		{
			title: 'A Fairy Tale I - Growing Pains',
			urlQuestQuickGuide:
				'https://runescape.wiki/w/A_Fairy_Tale_I_-_Growing_Pains/Quick_guide',
			urlQuestIcon:
				'https://runescape.wiki/images/A_Fairy_Tale_I_-_Growing_Pains_icon.png',
			urlQuestReward:
				'https://runescape.wiki/images/A_Fairy_Tale_I_-_Growing_Pains_reward.png',
			status: 'COMPLETED',
			difficulty: 2,
			members: true,
			questPoints: 2,
			userEligible: true,
		},
		{
			title: 'A Fairy Tale II - Cure a Queen',
			urlQuestQuickGuide:
				'https://runescape.wiki/w/A_Fairy_Tale_II_-_Cure_a_Queen/Quick_guide',
			urlQuestIcon:
				'https://runescape.wiki/images/A_Fairy_Tale_II_-_Cure_a_Queen_icon.png',
			urlQuestReward:
				'https://runescape.wiki/images/A_Fairy_Tale_II_-_Cure_a_Queen_reward.png',
			status: 'COMPLETED',
			difficulty: 2,
			members: true,
			questPoints: 2,
			userEligible: true,
		},
	],
	loggedIn: 'false',
}
