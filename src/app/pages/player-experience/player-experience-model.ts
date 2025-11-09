import dayjs from 'dayjs'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { usePlayerExperience } from '@/hooks/player-experience'
import type { IPlayerExperienceService } from '@/services/get-player-experience'

export function usePlayerExperienceModel(
	experienceService: IPlayerExperienceService
) {
	const [selectedSkillId, setSelectedSkillId] = useState<number>(-1)

	const [playerName] = useQueryState('name')
	const { data, isLoading } = usePlayerExperience(
		playerName || '',
		selectedSkillId,
		experienceService
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

	return {
		data,
		chartData,
		isLoading,
		selectedSkillId,
		setSelectedSkillId,
	}
}
