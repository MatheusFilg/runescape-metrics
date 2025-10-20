import { Link } from 'react-router'
import { Skeleton } from '@/components/ui/skeleton'
import type { ContainerProps } from './player-summary-container'

export function SkillsContainer({
	isLoading,
	playerDetails,
	skillValues,
	searchTerm,
}: ContainerProps) {
	return (
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
				{playerDetails !== undefined && !isLoading ? (
					<div className="flex flex-row w-full justify-between items-center align-middle">
						<h2>Total Level</h2>
						<span className="italic">
							{new Intl.NumberFormat('pt-BR').format(playerDetails?.totalskill)}
						</span>
					</div>
				) : (
					<Skeleton className="h-[16px] my-1 w-full rounded" />
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
	)
}
