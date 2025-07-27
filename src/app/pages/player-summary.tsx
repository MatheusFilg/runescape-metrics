import { useQueryState } from 'nuqs'
import { Link } from 'react-router'
import { usePlayerSearch } from '@/hooks/player-search'
import { skillReferences } from '@/utils/skills'

export function PlayerSummary() {
	const [searchTerm] = useQueryState('name')
	const { data, isLoading, isError } = usePlayerSearch(searchTerm || '')

	const skillValues = data?.skillvalues
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
		<div className="grid w-full h-screen grid-cols-3 p-2 gap-2">
			<div className="flex flex-col border bg-primary-foreground">
				<h1 className="uppercase text-2xl border-b p-2">Skills</h1>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Total Level</h2>
					<span className="text-muted-foreground italic">
						{data?.totalskill}
					</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Total Xp</h2>
					<span className="text-muted-foreground italic">
						{new Intl.NumberFormat('pt-BR').format(data?.totalxp)}
					</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Combat Level</h2>
					<span className="text-muted-foreground italic">
						{data?.combatlevel}
					</span>
				</div>

				<div className="grid grid-cols-3 grid-rows-10 gap-2 p-2 h-full">
					{skillValues?.map((item: any) => (
						<div
							className="grid grid-cols-[24px_10px_100px] gap-2 p-2 items-center bg-accent rounded"
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
