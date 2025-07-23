import { useQueryState } from 'nuqs'
import { usePlayerSearch } from '@/hooks/player-search'

export function PlayerSummary() {
	const [searchTerm] = useQueryState('name')
	const { data, isLoading, isError } = usePlayerSearch(searchTerm || '')

	console.log(data, 'data')
	return (
		<div className="flex w-full h-screen flex-col p-2 gap-2">
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error fetching data</p>}
		</div>
	)
}
