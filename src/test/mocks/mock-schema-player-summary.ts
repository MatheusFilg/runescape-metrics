import type { PlayerSummaryResponse } from '@/types/player-summary-response'

export const mockData: PlayerSummaryResponse = {
	name: 'Ageonn',
	combatlevel: 121,
	magic: 1073577,
	totalskill: 2231,
	questsstarted: 9,
	questscomplete: 183,
	questsnotstarted: 160,
	totalxp: 64503963,
	ranged: 5354104,
	rank: '308,300',
	melee: 34254979,
	loggedIn: 'false',
	skillvalues: [{ level: 90, xp: 53541049, rank: 389096, id: 3 }],
	activities: [
		{
			date: '15-Aug-2025 13:30',
			details: 'I killed  the shapeshifting elven hunter, Helwyr.',
			text: 'I killed  Helwyr.',
			activityType: 'bossKills',
			activityUrl: 'https://runescape.wiki/images/Combat_icon_large.png',
		},
		{
			id: '718992',
			date: '24-Sep-2025 13:25',
			details: "I have solved one of Gielinor's greatest mysteries.",
			text: 'Solved an archaeological mystery.',
			activityType: 'other',
			activityUrl: 'https://runescape.wiki/images/Default_achievement_icon.png',
		},
		{
			id: '606CCD',
			date: '24-Sep-2025 13:25',
			details: 'I levelled my Archaeology skill, I am now level 84.',
			text: 'Levelled up Archaeology.',
			activityType: 'leveling',
			activityUrl: 'https://runescape.wiki/images/Statistics.png',
		},
	],
}
