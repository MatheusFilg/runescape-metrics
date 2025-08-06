import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

interface ChartProps {
	questCompleted: number
	questStarted: number
	questNotStarted: number
}

const chartConfig = {
	questCompleted: {
		label: 'Quest Completed',
	},
	questStarted: {
		label: 'Quest Started',
	},
	questNotStarted: {
		label: 'Quest Not Started',
	},
} satisfies ChartConfig

export function ChartPieDonut({
	questStarted,
	questCompleted,
	questNotStarted,
}: ChartProps) {
	const chartData = [
		{
			id: 'questCompleted',
			name: 'Quests Completed',
			value: questCompleted,
			fill: 'var(--sidebar-ring)',
		},
		{
			id: 'questStarted',
			name: 'Quests Started',
			value: questStarted,
			fill: 'var(--chart-4)',
		},
		{
			id: 'questNotStarted',
			name: 'Quests Not Completed',
			value: questNotStarted,
			fill: 'var(--destructive)',
		},
	]

	return (
		<Card className="flex flex-col border-0 bg-sidebar-accent">
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[300px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="id"
							cx="50%"
							cy="50%"
							innerRadius={60}
							labelLine={false}
							label
						/>
						<ChartLegend content={<ChartLegendContent nameKey="id" />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
