import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { usePlayerQuests } from '@/hooks/player-quests'
import type { PlayerQuests } from '@/services/get-player-quests'

export function usePlayerQuestModel(playerService: PlayerQuests) {
	const [searchTerm] = useQueryState('name')
	const [inputValue, setInputValue] = useState('')

	const { data, isLoading } = usePlayerQuests(searchTerm || '', playerService)

	const filteredQuests = useMemo(() => {
		const allQuests = data?.quests || []

		if (!inputValue) {
			return allQuests
		}

		return allQuests.filter(quest =>
			quest.title.toLowerCase().includes(inputValue.toLowerCase())
		)
	}, [data?.quests, inputValue])

	return {
		data,
		isLoading,
		filteredQuests,
		setInputValue,
		inputValue,
	}
}
