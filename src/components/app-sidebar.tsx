import {
	BookMarked,
	ChartLine,
	ChartNoAxesCombined,
	Home,
	Scroll,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

const routes = [
	{
		title: 'Summary',
		icon: Home,
		url: '#',
	},
	{
		title: 'Activity',
		icon: Scroll,
		url: '#',
	},
	{
		title: 'Xp',
		icon: ChartLine,
		url: '#',
	},
	{
		title: 'Levels',
		icon: ChartNoAxesCombined,
		url: '#',
	},
	{
		title: 'Quests',
		icon: BookMarked,
		url: '#',
	},
]

export function AppSidebar() {
	const [searchTerm] = useQueryState('name')
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent className="flex flex-col gap-5">
				<div className="flex flex-row gap-0.5 align-middle items-center px-2">
					<Scroll />
					<h1 className="font-semibold text-lg ml-2">
						{searchTerm !== null ? searchTerm : 'Search for a player'}
					</h1>
				</div>
				<SidebarGroupContent className="flex flex-col gap-4">
					{routes.map(item => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									{item.title}
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarGroupContent>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
