import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { usePlayerQuests } from '@/hooks/player-quests'
import { HttpClient } from '@/infra/http-client'
import { PlayerQuestsService } from '@/services/get-player-quests'
import { QuestItem } from './components/quest-item'

export function PlayerQuests() {
	const [searchTerm] = useQueryState('name')
	const [inputValue, setInputValue] = useState('')

	const httpClient = HttpClient.create()
	const playerQuests = new PlayerQuestsService(httpClient)

	const { data } = usePlayerQuests(searchTerm || '', playerQuests)

	const filteredQuests = useMemo(() => {
		const allQuests = data?.quests || []

		if (!inputValue) {
			return allQuests
		}

		return allQuests.filter(quest =>
			quest.title.toLowerCase().includes(inputValue.toLowerCase())
		)
	}, [data?.quests, inputValue])

	return (
		<div>
			<div className="flex flex-col h-full bg-card rounded border">
				<div className="border-b capitalize p-2 gap-0.5 flex flex-col font-medium text-2xl">
					<h1>Quests</h1>
				</div>

				<div className="flex flex-col h-full bg-card rounded border p-2">
					<Input
						value={inputValue}
						className="w-52"
						placeholder="Search for a Quest"
						onChange={e => setInputValue(e.target.value)}
					/>
				</div>

				<div className="flex flex-col p-2 gap-2 h-[83dvh] overflow-scroll">
					{filteredQuests.map(quest => (
						<QuestItem quest={quest} key={quest.title} />
					))}
				</div>
			</div>
		</div>
	)
}
