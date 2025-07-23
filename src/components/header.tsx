import { InputSearch } from './input-search'
import { ThemeToggle } from './theme/theme-toggle'
import { SidebarTrigger } from './ui/sidebar'

export function Header() {
	return (
		<div className="w-full flex flex-row justify-between items-center border-b border-2 h-fit px-4 py-2">
			<SidebarTrigger />
			<div className="flex flex-row gap-4">
				<InputSearch />
				<ThemeToggle />
			</div>
		</div>
	)
}
