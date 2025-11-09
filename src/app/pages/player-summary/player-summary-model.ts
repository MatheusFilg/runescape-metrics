import { useQueryState } from 'nuqs'
import { usePlayerSearch } from '@/hooks/player-search'
import type { IPlayerService } from '@/services/get-player-summary'
import { skillReferences } from '@/utils/skills'

export function usePlayerSummaryModel(playerService: IPlayerService) {
	const [searchTerm] = useQueryState('name')
	const { data: playerSummary, isLoading } = usePlayerSearch(
		searchTerm || '',
		playerService
	)

	const skillValues = playerSummary?.skillvalues
		.map((item: any) => {
			const skillValuesComplete = skillReferences.find(
				(ref: any) => ref.id === item.id
			)
			return {
				...item,
				name: skillValuesComplete?.name,
				url: skillValuesComplete?.url,
				order: skillValuesComplete?.order,
			}
		})
		.sort((a: any, b: any) => a.order - b.order)

	return {
		isLoading,
		searchTerm,
		skillValues,
		playerSummary,
	}
}
