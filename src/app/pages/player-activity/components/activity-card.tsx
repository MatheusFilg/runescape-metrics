import type { Activity } from '@/types/player-summary-response'
import { formatDateFromNow } from '@/utils/format-date-to-now'

export function ActivityCard({ activityUrl, text, details, date }: Activity) {
	return (
		<div className=" w-full border bg-sidebar-accent rounded flex flex-col gap-2">
			<div className="flex flex-row p-4 gap-2 items-center border-b">
				<img className="size-8" src={activityUrl} alt="activity icon" />
				<span className="text-xl">{text}</span>
			</div>
			<div className="flex flex-row px-4 py-2 justify-between">
				<span>{details}</span>
				<span className="text-sm text-muted-foreground italic">
					{formatDateFromNow(date)}
				</span>
			</div>
		</div>
	)
}
