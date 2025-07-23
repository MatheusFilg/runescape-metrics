import { useQueryState } from 'nuqs'
import { Link } from 'react-router'
import { usePlayerSearch } from '@/hooks/player-search'

export function PlayerSummary() {
	const [searchTerm] = useQueryState('name')
	const { data, isLoading, isError } = usePlayerSearch(searchTerm || '')

	const sortedSkills = [...data.skillvalues].sort((a, b) => a.id - b.id)
	return (
		<div className="grid w-full h-screen grid-cols-3 p-2 gap-2">
			<div className="flex flex-col border">
				<h1 className="uppercase text-2xl border-b p-2">Skills</h1>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2 className="text-lg">Total Level</h2>
					<span>{data?.totalskill}</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2 className="text-lg">Total Xp</h2>
					<span>{new Intl.NumberFormat('pt-BR').format(data?.totalxp)}</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2 className="text-lg">Combat Level</h2>
					<span>{data?.combatlevel}</span>
				</div>

				<div className="grid grid-cols-4 grid-rows-8 p-2 h-full">
					{sortedSkills.map(item => (
						<span key={item.id}>{item.id}</span>
					))}
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
			<div className="">Activity</div>
			<div className="">Quests</div>
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error fetching data</p>}
		</div>
	)
}
