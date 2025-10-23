import { flexRender } from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { CardInfoLevels } from './components/card-info-levels'
import type { usePlayerLevelsModel } from './player-levels-model'

type PlayerLevelsViewProps = ReturnType<typeof usePlayerLevelsModel>

export function PlayerLevelsView(props: PlayerLevelsViewProps) {
	const { data, isLoading, table } = props

	return (
		<div>
			<div className="flex flex-col h-full gap-4 bg-card rounded border">
				<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
					<h1>Levels & Progress</h1>
				</div>

				<div className="flex flex-col p-2 gap-4 h-[85dvh]">
					<div className="flex flex-row justify-between gap-8">
						{data !== undefined && !isLoading ? (
							<CardInfoLevels
								text="combat level"
								info={new Intl.NumberFormat('pt-BR').format(data.combatlevel)}
							/>
						) : (
							<Skeleton className="h-24 my-1 w-full rounded" />
						)}

						{data !== undefined && !isLoading ? (
							<CardInfoLevels
								text="total level"
								info={new Intl.NumberFormat('pt-BR').format(data.totalskill)}
							/>
						) : (
							<Skeleton className="h-24 my-1 w-full rounded" />
						)}

						{data !== undefined && !isLoading ? (
							<CardInfoLevels
								text="total xp"
								info={new Intl.NumberFormat('pt-BR').format(data.totalxp)}
							/>
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
													asc: <ArrowDownNarrowWide />,
													desc: <ArrowUpWideNarrow />,
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
