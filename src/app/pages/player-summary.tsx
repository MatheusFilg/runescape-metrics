import { useQueryState } from 'nuqs'
import { Link } from 'react-router'
import { ChartPieDonut } from '@/components/chart-pie-donut'
import { Skeleton } from '@/components/ui/skeleton'
import { usePlayerSearch } from '@/hooks/player-search'
import { formatDateFromNow } from '@/utils/format-date-to-now'
import { skillReferences } from '@/utils/skills'

export function PlayerSummary() {
	const [searchTerm] = useQueryState('name')
	const { data: playerDetails, isLoading } = usePlayerSearch(searchTerm || '')

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

	return (
		<div className="grid w-full h-screen grid-cols-3 p-2 gap-6 overflow-hidden">
			<div className="flex flex-col border bg-card rounded h-full">
				<h1 className="uppercase text-2xl border-b p-2">Skills</h1>

				<div className="flex flex-row w-full border-b px-2 py-1">
					{isLoading ? (
						<Skeleton className="h-[16px] my-1 w-full rounded" />
					) : (
						<div className="flex flex-row w-full justify-between items-center align-middle">
							<h2>Combat Level</h2>
							<span className="italic">{playerDetails?.combatlevel}</span>
						</div>
					)}
				</div>

				<div className="flex flex-row w-full border-b px-2 py-1">
					{isLoading ? (
						<Skeleton className="h-[16px] my-1 w-full rounded" />
					) : (
						<div className="flex flex-row w-full justify-between items-center align-middle">
							<h2>Total Level</h2>
							<span className="italic">{playerDetails?.totalskill}</span>
						</div>
					)}
				</div>
				<div className="flex flex-row w-full border-b px-2 py-1">
					{playerDetails !== undefined && !isLoading ? (
						<div className="flex flex-row w-full justify-between items-center align-middle">
							<h2>Total Xp</h2>
							<span className="italic">
								{new Intl.NumberFormat('pt-BR').format(playerDetails?.totalxp)}
							</span>
						</div>
					) : (
						<Skeleton className="h-[16px] my-1 w-full rounded" />
					)}
				</div>

				<div className="h-full p-2">
					{isLoading ? (
						<Skeleton className="h-full w-full rounded" />
					) : (
						<div className="grid grid-cols-3 grid-rows-10 gap-2">
							{skillValues?.map((item: any) => (
								<div
									className="grid grid-cols-[24px_10px_100px] gap-2 p-2 items-center bg-sidebar-accent rounded"
									key={item.id}
								>
									<img className="" src={item.url} alt="" />
									<div className="w-[1px] h-full bg-border" />
									<div className="flex flex-col">
										<span>{item.level}</span>
										<span className="text-sm text-muted-foreground italic">
											{`${new Intl.NumberFormat('pt-BR').format(item.xp)} xp`}
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
							pathname: '/levels',
							search: searchTerm ? `?name=${searchTerm}` : '',
						}}
						className="flex underline justify-end"
					>
						See All Levels
					</Link>
				</div>
			</div>

			<div className="flex flex-col border bg-card rounded h-full">
				<h1 className="uppercase text-2xl border-b p-2">Activity</h1>

				<div className=" h-full p-2">
					{isLoading ? (
						<Skeleton className="h-full w-full rounded" />
					) : (
						<div className="flex flex-col gap-2 h-[82dvh] overflow-scroll">
							{playerDetails?.activities.map((item: any) => (
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
		</div>
	)
}
