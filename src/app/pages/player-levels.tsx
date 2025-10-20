import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { usePlayerSearch } from '@/hooks/player-search'
import { HttpClient } from '@/infra/http-client'
import { PlayerService } from '@/services/get-player-details'
import type { SkillValue } from '@/types/player-summary-response'
import { skillReferences } from '@/utils/skills'

export function PlayerLevels() {
	interface SkillData extends SkillValue {
		name: string | undefined
		image: string | undefined
	}

	const [sorting, setSorting] = useState<SortingState>([])

	const httpClient = HttpClient.create()
	const playerService = new PlayerService(httpClient)

	const [searchTerm] = useQueryState('name')
	const { data, isLoading } = usePlayerSearch(searchTerm || '', playerService)

	const skillData = useMemo(() => {
		if (!data) return []
		return data?.skillvalues.map(item => {
			const skillDataComplete = skillReferences.find(ref => item.id === ref.id)

			return {
				...item,
				name: skillDataComplete?.name,
				image: skillDataComplete?.url,
			}
		})
	}, [data])

	const columnHelper = createColumnHelper<SkillData>()
	const columns = useMemo(
		() => [
			columnHelper.accessor('image', {
				id: 'icon',
				cell: info => <img src={info.getValue()} alt="skill icon" />,
				header: () => <span />,
			}),
			columnHelper.accessor('name', {
				id: 'skillName',
				cell: info => info.getValue(),
				header: () => <span>Skill Name</span>,
				enableSorting: true,
			}),
			columnHelper.accessor('level', {
				id: 'lastName',
				cell: info => info.getValue(),
				header: () => <span>Level</span>,
				enableSorting: true,
			}),
			columnHelper.accessor('percentageProgress', {
				id: 'percentageProgress',
				cell: info => (
					<div className="flex flex-row gap-2 items-center px-4">
						<Progress value={Number(info.getValue())} />{' '}
						<span className="text-xs">{info.getValue()}%</span>
					</div>
				),
				header: () => <span className="px-4">Progress</span>,
			}),

			columnHelper.accessor('xpToNextLevel', {
				id: 'xpToNextLevel',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Xp Left</span>,
			}),
			columnHelper.accessor('xp', {
				id: 'xp',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Total Xp</span>,
			}),
			columnHelper.accessor('rank', {
				id: 'rank',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Rank</span>,
			}),
		],
		[columnHelper]
	)

	const table = useReactTable({
		data: skillData || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
	})

	// console.log(table.getState().sorting)

	return (
		<div>
			<div className="flex flex-col h-full gap-4 bg-card rounded border">
				<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
					<h1>Levels & Progress</h1>
				</div>

				<div className="flex flex-col p-2 gap-4 h-[85dvh]">
					<div className="flex flex-row justify-between gap-8">
						{data !== undefined && !isLoading ? (
							<div className="bg-sidebar-accent place-items-center justify-center flex flex-col gap-2 px-4 py-2 rounded w-full h-24">
								<span className="text-sm capitalize">combat level</span>
								<h1 className="text-4xl font-bold">{data?.combatlevel}</h1>
							</div>
						) : (
							<Skeleton className="h-24 my-1 w-full rounded" />
						)}

						{data !== undefined && !isLoading ? (
							<div className="bg-sidebar-accent place-items-center justify-center flex flex-col gap-2 px-4 py-2 rounded w-full h-24">
								<span className="text-sm capitalize">total level</span>
								<h1 className="text-4xl font-bold">
									{new Intl.NumberFormat('pt-BR').format(data?.totalskill)}
								</h1>
							</div>
						) : (
							<Skeleton className="h-24 my-1 w-full rounded" />
						)}

						{data !== undefined && !isLoading ? (
							<div className="bg-sidebar-accent place-items-center justify-center flex flex-col gap-2 px-4 py-2 rounded w-full h-24">
								<span className="text-sm capitalize">total xp</span>
								<h1 className="text-4xl font-bold">
									{new Intl.NumberFormat('pt-BR').format(data?.totalxp)}
								</h1>
							</div>
						) : (
							<Skeleton className="h-24 my-1 w-full rounded" />
						)}
					</div>

					<Table>
						<TableHeader className="sticky top-0 bg-card z-99 font-bold text-lg">
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead
											onClick={header.column.getToggleSortingHandler()}
											className={
												header.column.getCanSort()
													? 'cursor-pointer select-none'
													: ''
											}
											key={header.id}
										>
											<div className="flex flex-row gap-0.5 items-center">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
												{{
													asc: <ArrowUpNarrowWide />,
													desc: <ArrowDownWideNarrow />,
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
