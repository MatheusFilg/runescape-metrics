import { Link } from 'react-router'
import { ChartPieDonut } from '@/components/chart-pie-donut'
import { Skeleton } from '@/components/ui/skeleton'
import type { ContainerProps } from './container'

export function QuestsContainer({
	isLoading,
	playerDetails,
	searchTerm,
}: ContainerProps) {
	return (
		<div className="flex flex-col border bg-card h-fit rounded">
			<h1 className="uppercase text-2xl border-b p-2">Quests</h1>

			<div className="p-2 h-full">
				{playerDetails !== undefined && !isLoading ? (
					<div className="flex flex-col p-2 gap-2 overflow-scroll">
						<ChartPieDonut
							questCompleted={playerDetails?.questscomplete}
							questNotStarted={playerDetails?.questsnotstarted}
							questStarted={playerDetails?.questsstarted}
						/>
					</div>
				) : (
					<Skeleton className="h-80 mb-2 w-full rounded" />
				)}

				<div className="p-2 border-t">
					<Link
						to={{
							pathname: '/quests',
							search: searchTerm ? `?name=${searchTerm}` : '',
						}}
						className="flex underline justify-end"
					>
						See All Quests
					</Link>
				</div>
			</div>
		</div>
	)
}
