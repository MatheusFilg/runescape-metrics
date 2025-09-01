import type {
	PlayerSummaryResponse,
	SkillValue,
} from './player-summary-response'

export interface ContainerProps {
	isLoading: boolean
	searchTerm: string | null
	skillValues?: SkillValue[] | undefined
	playerDetails: PlayerSummaryResponse | undefined
}
