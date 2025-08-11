export interface PlayerSummaryResponse {
	name: string
	combatlevel: number
	magic: number
	totalskill: number
	questsstarted: number
	questscomplete: number
	questsnotstarted: number
	totalxp: number
	ranged: number
	rank: string
	melee: number
	loggedIn: string
	skillvalues: Skillvalue[]
	activities: Activity[]
}

interface Skillvalue {
	level: number
	xp: number
	rank: number
	id: number
}

export interface Activity {
	date: string
	details: string
	text: string
	activityType: string
	activityUrl: string
}
