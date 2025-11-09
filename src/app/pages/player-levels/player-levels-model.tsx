import {
	createColumnHelper,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { usePlayerSearch } from '@/hooks/player-search'
import type { IPlayerService } from '@/services/get-player-summary'
import type { SkillValue } from '@/types/player-summary-response'
import { skillReferences } from '@/utils/skills'

interface SkillData extends SkillValue {
	name: string | undefined
	image: string | undefined
}

export const usePlayerLevelsModel = (playerLevelService: IPlayerService) => {
	const [searchTerm] = useQueryState('name')
	const { data, isLoading } = usePlayerSearch(
		searchTerm || '',
		playerLevelService
	)
	const [sorting, setSorting] = useState<SortingState>([])

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
				enableSorting: false,
			}),
			columnHelper.accessor('name', {
				id: 'skillName',
				cell: info => info.getValue(),
				header: () => <span>Skill Name</span>,
				enableSorting: true,
			}),
			columnHelper.accessor('level', {
				id: 'level',
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
				enableSorting: true,
			}),

			columnHelper.accessor('xpToNextLevel', {
				id: 'xpToNextLevel',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Xp Left</span>,
				enableSorting: true,
			}),
			columnHelper.accessor('xp', {
				id: 'xp',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Total Xp</span>,
				enableSorting: true,
			}),
			columnHelper.accessor('rank', {
				id: 'rank',
				cell: info => new Intl.NumberFormat('pt-BR').format(info.getValue()),
				header: () => <span>Rank</span>,
				enableSorting: true,
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

	return {
		data,
		table,
		skillData,
		isLoading,
	}
}
