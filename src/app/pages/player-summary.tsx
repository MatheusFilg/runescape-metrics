import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useQueryState } from 'nuqs'
import { Link } from 'react-router'
import { ChartPieDonut } from '@/components/chart-pie-donut'
import { usePlayerSearch } from '@/hooks/player-search'
import { skillReferences } from '@/utils/skills'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

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

	const formatDateFromNow = (dateString: string): string => {
		try {
			const apiTimezone = 'UTC'
			const dateInOriginalTimezone = dayjs.tz(
				dateString,
				'DD-MMM-YYYY HH:mm',
				apiTimezone
			)

			if (!dateInOriginalTimezone.isValid()) {
				console.error('Data inválida na conversão inicial:', dateString)
				return 'Data inválida'
			}

			const userTimezone = dayjs.tz.guess()
			const dateInUserTimezone = dateInOriginalTimezone.tz(userTimezone)

			return dateInUserTimezone.fromNow()
		} catch (error) {
			console.error('Erro ao formatar data:', error)
			return 'Data inválida'
		}
	}

	return (
		<div className="grid w-full h-screen grid-cols-3 p-2 gap-6">
			<div className="flex flex-col border bg-card rounded">
				<h1 className="uppercase text-2xl border-b p-2">Skills</h1>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Combat Level</h2>
					<span className="italic">{data?.combatlevel}</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Total Level</h2>
					<span className="italic">{data?.totalskill}</span>
				</div>
				<div className="flex flex-row w-full justify-between border-b items-center align-middle px-2 py-1">
					<h2>Total Xp</h2>
					<span className="italic">
						{new Intl.NumberFormat('pt-BR').format(data?.totalxp)}
					</span>
				</div>

				<div className="grid grid-cols-3 grid-rows-10 gap-2 p-2 h-full">
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

			<div className="flex flex-col border bg-card rounded">
				<h1 className="uppercase text-2xl border-b p-2">Activity</h1>

				<div className="flex flex-col gap-2 p-2 h-[83dvh] overflow-scroll">
					{data?.activities.map((item: any) => (
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

			<div className="flex flex-col border bg-card h-fit">
				<h1 className="uppercase text-2xl border-b p-2">Quests</h1>

				<div className="flex flex-col gap-2 p-2 overflow-scroll">
					<ChartPieDonut
						questCompleted={data?.questscomplete}
						questNotStarted={data?.questsnotstarted}
						questStarted={data?.questsstarted}
					/>
				</div>

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
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error fetching data</p>}
		</div>
	)
}
