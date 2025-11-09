import { Link } from 'react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateFromNow } from '@/utils/format-date-to-now'
import type { ContainerProps } from './player-summary-container'

export function ActivitiesContainer({
	isLoading,
	playerSummary,
	searchTerm,
}: ContainerProps) {
	return (
		<div className="flex flex-col border bg-card rounded h-full">
			<h1 className="uppercase text-2xl border-b p-2">Activity</h1>

			<div className=" h-full p-2">
				{isLoading ? (
					<Skeleton className="h-full w-full rounded" />
				) : (
					<div className="flex flex-col gap-2 h-[82dvh] overflow-scroll">
						{playerSummary?.activities.map((item: any) => (
							<div
								className="gap-2 flex flex-row p-2 items-center bg-sidebar-accent rounded"
								key={item.id}
							>
								<img src={item.activityUrl} alt="" className="size-8" />
								<div className="flex flex-col gap-1">
									<span>{item.text}</span>
									<span className="text-sm text-muted-foreground italic">
										{formatDateFromNow(item.date)}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="p-2 border-t">
				<Link
					to={{
						pathname: '/activity',
						search: searchTerm ? `?name=${searchTerm}` : '',
					}}
					className="flex underline justify-end"
				>
					See All Activities
				</Link>
			</div>
		</div>
	)
}
