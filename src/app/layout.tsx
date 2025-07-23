import { Outlet } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { SidebarProvider } from '@/components/ui/sidebar'

export function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex w-full flex-col">
				<Header />
				<Outlet />
			</main>
		</SidebarProvider>
	)
}
