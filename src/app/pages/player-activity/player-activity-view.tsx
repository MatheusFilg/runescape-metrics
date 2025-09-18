import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateFromNow } from '@/utils/format-date-to-now'
import type { usePlayerActivityModel } from './palyer-activity-model'

type PlayerActivityViewProps = ReturnType<typeof usePlayerActivityModel>

export const PlayerActivityView = (props: PlayerActivityViewProps) => {
	const {
		isLoading,
		activityTypes,
		activityFilter,
		setActivityFilter,
		filteredActivities,
	} = props
	return (
		<div className="flex flex-col border bg-card rounded h-full">
			<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
				<h1>Activity ({filteredActivities.length})</h1>
				<span className="italic text-xs text-muted-foreground">
					* The RuneScape API only returns the last 20 activities.
				</span>
			</div>

			<div className=" flex flex-col p-2 gap-2 h-[85dvh]">
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
							<div
								className=" w-full border bg-sidebar-accent rounded flex flex-col gap-2"
								key={activity.id}
							>
								<div className="flex flex-row p-4 gap-2 items-center border-b">
									<img
										className="size-8"
										src={activity.activityUrl}
										alt="activity icon"
									/>
									<span className="text-xl">{activity.text}</span>
								</div>
								<div className="flex flex-row px-4 py-2 justify-between">
									<span>{activity.details}</span>
									<span className="text-sm text-muted-foreground italic">
										{formatDateFromNow(activity.date)}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
