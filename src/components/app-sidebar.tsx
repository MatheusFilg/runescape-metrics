import {
	BookMarked,
	ChartLine,
	ChartNoAxesCombined,
	Home,
	Scroll,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Link } from 'react-router'
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
		url: '/summary',
	},
	{
		title: 'Activity',
		icon: Scroll,
		url: '/activity',
	},
	{
		title: 'Xp',
		icon: ChartLine,
		url: '/xp',
	},
	{
		title: 'Levels',
		icon: ChartNoAxesCombined,
		url: '/levels',
	},
	{
		title: 'Quests',
		icon: BookMarked,
		url: '/quests',
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
				<SidebarGroupContent
					className="flex flex-col gap-4"
					data-testid="sidebar-navigation"
				>
					{routes.map(item => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link
									to={{
										pathname: item.url,
										search: searchTerm ? `?name=${searchTerm}` : '',
									}}
									className={
										!searchTerm ? 'pointer-events-none opacity-50' : ''
									}
								>
									<item.icon />
									{item.title}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarGroupContent>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
