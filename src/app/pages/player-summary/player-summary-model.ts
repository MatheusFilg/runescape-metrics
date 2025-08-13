import { useQueryState } from 'nuqs'
import { usePlayerSearch } from '@/hooks/player-search'
import type { IPlayerService } from '@/services/get-player-details'
import { skillReferences } from '@/utils/skills'

type PlayerSummaryModelProps = {
	playerService: IPlayerService
}

export const usePlayerSummaryModel = ({
	playerService,
}: PlayerSummaryModelProps) => {
	const [searchTerm] = useQueryState('name')
	const { data: playerDetails, isLoading } = usePlayerSearch(
		searchTerm || '',
		playerService
	)

	const skillValues = playerDetails?.skillvalues
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
		playerDetails,
	}
}
