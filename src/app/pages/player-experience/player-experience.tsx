import { ChartLineDefault } from '@/components/chart-line'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { skillReferences } from '@/utils/skills'
import type { usePlayerExperienceModel } from './player-experience-model'

type PlayerExperienceViewProps = ReturnType<typeof usePlayerExperienceModel>

export function PlayerExperienceView(props: PlayerExperienceViewProps) {
	const { setSelectedSkillId, selectedSkillId, isLoading, chartData } = props

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
