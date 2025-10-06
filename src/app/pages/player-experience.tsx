import dayjs from 'dayjs'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { ChartLineDefault } from '@/components/chart-line'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { usePlayerExperience } from '@/hooks/player-experience'
import { HttpClient } from '@/infra/http-client'
import { PlayerExperienceService } from '@/services/get-player-experience'
import { skillReferences } from '@/utils/skills'

export function PlayerExperience() {
	const playerExperienceService = new PlayerExperienceService(
		HttpClient.create()
	)

	const [selectedSkillId, setSelectedSkillId] = useState<number>(-1)

	const [playerName] = useQueryState('name')
	const { data, isLoading } = usePlayerExperience(
		playerName || '',
		selectedSkillId,
		playerExperienceService
	)

	const chartData = useMemo(() => {
		if (!data?.monthlyXpGain) {
			return []
		}
		const selectedSkillData = data?.monthlyXpGain.find(
			skill => skill.skillId === selectedSkillId
		)

		if (!selectedSkillData?.monthData) {
			return []
		}
		return selectedSkillData.monthData.map(month => ({
			...month,
			monthName: dayjs(month.timestamp).format('MMM'),
		}))
	}, [data, selectedSkillId])

	return (
		<div>
			<div className="flex flex-col h-full bg-card rounded border">
				<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
					<h1>Skills</h1>
					<span className="italic text-xs text-muted-foreground">
						* Xp gained monthly
					</span>
				</div>

				<div className=" flex flex-col p-2 gap-10 h-[85dvh]">
					<div>
						<Select
							onValueChange={value => setSelectedSkillId(Number(value))}
							value={selectedSkillId.toString()}
						>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Select a Skill" />
							</SelectTrigger>
							<SelectContent className="max-h-96">
								<SelectItem value="-1">Overall</SelectItem>
								{skillReferences.map(skill => (
									<SelectItem value={skill.id.toString()} key={skill.id}>
										{skill.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex align-middle justify-center w-full">
						{isLoading ? (
							<Skeleton className="h-160 mb-2 w-3/4 rounded" />
						) : (
							<ChartLineDefault chartData={chartData} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
