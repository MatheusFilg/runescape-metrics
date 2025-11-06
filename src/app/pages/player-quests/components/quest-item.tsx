import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { Quest } from '@/types/player-quests-response'

interface QuestItemProps {
	quest: Quest
}

enum questDifficulty {
	Novice,
	Intermediate,
	Experienced,
	Master,
	Grandmaster,
	Special,
}

export const QuestItem = ({ quest }: QuestItemProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const difficultyName = questDifficulty[quest.difficulty]

	const defaultIconUrl = 'https://runescape.wiki/images/Quest_icon.png'
	const defaultRewardUrl = 'https://imgur.com/sFCBK0H.png'

	const handleImageError = (
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		const target = e.currentTarget

		if (target.alt.includes('quest icon')) {
			target.src = defaultIconUrl
		}
		if (target.alt.includes('quest reward')) {
			target.src = defaultRewardUrl
		}
	}

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className=" w-full border bg-sidebar-accent rounded flex flex-col gap-2"
			key={quest.title}
		>
			<div className="grid grid-cols-2 justify-between py-2 px-4 items-center h-28">
				<div className="flex flex-row gap-4 items-center h-full">
					<img
						src={quest.urlQuestIcon}
						alt="quest icon"
						className="size-12"
						onError={handleImageError}
					/>
					<div className="flex flex-col gap-1">
						<a href={quest.urlQuestQuickGuide} target="_blank" rel="noopener">
							<span className="text-xl underline">{quest.title}</span>
						</a>

						<div className="flex flex-row gap-2">
							<img
								src={
									quest.members
										? 'https://runescape.wiki/images/thumb/P2P_icon.png/30px-P2P_icon.png?76a76'
										: 'https://runescape.wiki/images/thumb/F2P_icon.png/30px-F2P_icon.png?3635b'
								}
								alt="membership icon"
								className="size-7"
							/>
							<span
								className={`text-sm self-center p-0.5 rounded-sm
											${quest.status === 'COMPLETED' ? 'bg-chart-2' : quest.status === 'STARTED' ? 'bg-chart-1' : 'bg-destructive'}`}
							>
								{quest.status}
							</span>
							<span className="bg-background/50 p-1 rounded-full text-sm self-center">
								{quest.userEligible ? (
									<span>Eligible</span>
								) : (
									<span>Not Eligible</span>
								)}
							</span>
							<span className="bg-background/50 p-1 rounded-full text-sm self-center">
								{difficultyName}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col h-full">
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="hover:cursor-pointer place-self-end"
						>
							{isOpen ? (
								<EyeClosed className="size-6" />
							) : (
								<Eye className="size-6" />
							)}
						</Button>
					</CollapsibleTrigger>
				</div>
			</div>

			<CollapsibleContent className="flex flex-col px-4 py-2 items-center justify-center gap-2 border-t">
				<img
					alt="quest reward"
					src={quest.urlQuestReward}
					onError={handleImageError}
					className="max-w-96 max-h-80"
				/>
			</CollapsibleContent>
		</Collapsible>
	)
}
