'use client'

import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import type { MonthData } from '@/types/player-experience-response'

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig

interface ChartProps {
	chartData: MonthData[] | undefined
}

const formatNumber = (value: number) => {
	return new Intl.NumberFormat('pt-BR').format(value)
}

const formatCompactNumber = (value: number) => {
	return new Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1,
		compactDisplay: 'short',
	}).format(value)
}

export function ChartLineDefault({ chartData }: ChartProps) {
	return (
		<Card className="border-0 shadow-none">
			<CardContent>
				<ChartContainer config={chartConfig} className="mx-auto h-160">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="monthName"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={formatCompactNumber}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Line
							dataKey="xpGain"
							type="natural"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={{
								fill: 'var(--color-desktop)',
							}}
							activeDot={{
								r: 6,
							}}
						>
							<LabelList
								dataKey="xpGain"
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
								formatter={formatNumber}
							/>
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
