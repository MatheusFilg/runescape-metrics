import { SearchX } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ActivityCard } from './components/activity-card'
import type { usePlayerActivityModel } from './player-activity-model'

type PlayerActivityViewProps = ReturnType<typeof usePlayerActivityModel>

export function PlayerActivityView(props: PlayerActivityViewProps) {
	const {
		isLoading,
		activityTypes,
		activityFilter,
		setActivityFilter,
		filteredActivities,
	} = props

	return (
		<div>
			{filteredActivities.length === 0 && !isLoading ? (
				<div className="flex flex-col gap-1 items-center h-96 justify-center">
					<SearchX size={44} />
					<span>Player not found, please search again.</span>
				</div>
			) : (
				<div className="flex flex-col border bg-card rounded h-full">
					<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
						<h1>Activity ({filteredActivities.length})</h1>
						<span className="italic text-xs text-muted-foreground">
							* The RuneScape API only returns the last 20 activities.
						</span>
					</div>

					<div className="flex flex-col p-2 gap-2 h-[85dvh]">
						<div className="flex flex-row p-2 w-60 gap-2 items-center">
							{isLoading ? (
								<Skeleton className="h-5 my-1 w-full rounded" />
							) : (
								<Select
									defaultValue={activityFilter}
									onValueChange={setActivityFilter}
								>
									<SelectTrigger className="w-40">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{activityTypes.map(activity => (
											<SelectItem value={activity.value} key={activity.name}>
												{activity.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						</div>

						{isLoading ? (
							<Skeleton className="h-full w-full rounded" />
						) : (
							<div className="h-fit p-2 overflow-scroll items-center flex flex-col gap-2 ">
								{filteredActivities.map(activity => (
									<ActivityCard
										key={activity?.id}
										text={activity.text}
										date={activity.date}
										details={activity.details}
										activityType={activity.activityType}
										activityUrl={activity.activityUrl}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
