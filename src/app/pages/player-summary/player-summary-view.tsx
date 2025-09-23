import { SearchX } from 'lucide-react'
import { ActivitiesContainer } from './components/activities-container'
import { QuestsContainer } from './components/quests-container'
import { SkillsContainer } from './components/skills-container'
import type { usePlayerSummaryModel } from './player-summary-model'

type PlayerSummaryViewProps = ReturnType<typeof usePlayerSummaryModel>

export const PlayerSummaryView = (props: PlayerSummaryViewProps) => {
	const { isLoading, playerDetails, searchTerm, skillValues } = props

	return (
		<div>
			{!playerDetails && !isLoading ? (
				<div className="flex flex-col gap-1 items-center h-96 justify-center">
					<SearchX size={44} />
					<span>Player not found, please search again.</span>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-6 overflow-hidden">
					<SkillsContainer
						isLoading={isLoading}
						playerDetails={playerDetails}
						searchTerm={searchTerm}
						skillValues={skillValues}
					/>

					<ActivitiesContainer
						isLoading={isLoading}
						playerDetails={playerDetails}
						searchTerm={searchTerm}
					/>

					<QuestsContainer
						isLoading={isLoading}
						playerDetails={playerDetails}
						searchTerm={searchTerm}
					/>
				</div>
			)}
		</div>
	)
}
