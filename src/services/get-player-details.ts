import { api } from '@/lib/axios'

interface getPlayerDetailsProps {
	name: string
	activities?: number
}

export async function getPlayerDetails({
	name,
	activities = 20,
}: getPlayerDetailsProps) {
	const response = await api.get('/player-details', {
		params: { name, activities },
	})

	return response.data
}
