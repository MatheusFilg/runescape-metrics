import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { usePlayerSearch } from '@/hooks/player-search'
import type { IPlayerService } from '@/services/get-player-summary'

export function usePlayerActivityModel(playerService: IPlayerService) {
	const [searchTerm] = useQueryState('name')
	const { data, isLoading } = usePlayerSearch(searchTerm || '', playerService)
	const playerActivitiesDetails = data?.activities
	const activityTypes = [
		{
			name: 'All',
			value: 'all',
		},
		{
			name: 'Leveling',
			value: 'leveling',
		},
		{
			name: 'Boss',
			value: 'bossKills',
		},
		{
			name: 'Quest',
			value: 'quest',
		},
		{
			name: 'Quest Points',
			value: 'questPoints',
		},
		{
			name: 'Loot',
			value: 'drop',
		},
		{
			name: 'Mini Game',
			value: 'miniGame',
		},
		{
			name: 'Clue',
			value: 'clue',
		},
		{
			name: 'Song',
			value: 'songs',
		},
		{
			name: 'Others',
			value: 'other',
		},
	]
	const [activityFilter, setActivityFilter] = useState('all')

	const filteredActivities = useMemo(() => {
		if (!playerActivitiesDetails) return []
		if (activityFilter === 'all') return playerActivitiesDetails

		return playerActivitiesDetails.filter(
			activity => activity.activityType === activityFilter
		)
	}, [playerActivitiesDetails, activityFilter])

	return {
		isLoading,
		activityTypes,
		activityFilter,
		setActivityFilter,
		filteredActivities,
		playerActivitiesDetails,
	}
}
