import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { QuestItem } from './components/quest-item'
import type { usePlayerQuestModel } from './player-quest-model'

type PlayerQuestViewProps = ReturnType<typeof usePlayerQuestModel>

export function PlayerQuestsView(props: PlayerQuestViewProps) {
	const { inputValue, filteredQuests, setInputValue, isLoading } = props

	return (
		<div>
			<div className="flex flex-col h-full bg-card rounded border">
				<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
					<h1>Quests</h1>
				</div>

				<div className="flex flex-col h-full bg-card rounded border p-2">
					{isLoading && filteredQuests.length === 0 ? (
						<Skeleton className="h-6 my-1 w-52 rounded" />
					) : (
						<Input
							value={inputValue}
							className="w-52"
							placeholder="Search for a Quest"
							onChange={e => setInputValue(e.target.value)}
						/>
					)}
				</div>

				<div className="p-2">
					{isLoading && filteredQuests.length === 0 ? (
						<Skeleton className="h-[81dvh] w-full rounded" />
					) : (
						<div className="flex flex-col gap-2 h-[80dvh] overflow-scroll">
							{filteredQuests.map(quest => (
								<QuestItem quest={quest} key={quest.title} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
