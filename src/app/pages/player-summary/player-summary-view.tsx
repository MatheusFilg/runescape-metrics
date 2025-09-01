import { ActivitiesContainer } from './components/activities-container'
import { QuestsContainer } from './components/quests-container'
import { SkillsContainer } from './components/skills-container'
import type { usePlayerSummaryModel } from './player-summary-model'

type PlayerSummaryViewProps = ReturnType<typeof usePlayerSummaryModel>

export const PlayerSummaryView = (props: PlayerSummaryViewProps) => {
	const { isLoading, playerDetails, searchTerm, skillValues } = props

	return (
		<div className="grid w-full h-screen grid-cols-3 p-2 gap-6 overflow-hidden">
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
	)
}
