import { fireEvent, render, screen } from '@testing-library/react'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { MemoryRouter } from 'react-router'
import { vi } from 'vitest'
import { Layout } from '@/app/layout'

const mockNavigate = vi.fn()

vi.mock('@/src/components/sidebar', () => ({
	useSidebar: () => ({
		toggleSidebar: vi.fn(),
		isSidebarOpen: false,
	}),
}))

describe('RootLayout', () => {
	it('should render the header with the sidebar button', () => {
		render(
			<NuqsAdapter>
				<MemoryRouter>
					<Layout />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const sidebarMenuButton = screen.getByRole('button', {
			name: /toggle sidebar/i,
		})

		expect(sidebarMenuButton).toBeInTheDocument()
	})
	it('should render the header with the theme toggle button', () => {
		render(
			<NuqsAdapter>
				<MemoryRouter>
					<Layout />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const themeToggleButton = screen.getByRole('button', {
			name: /toggle theme/i,
		})

		expect(themeToggleButton).toBeInTheDocument()
	})
	it('should render the header with the search input when the page is different of home', () => {
		vi.mock('react-router', async () => {
			const actual = await vi.importActual('react-router')
			return {
				...actual,
				useNavigate: () => mockNavigate,
				useLocation: () => ({ pathname: '/summary' }),
			}
		})

		render(
			<NuqsAdapter>
				<MemoryRouter>
					<Layout />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const searchInput = screen.getByTestId('search-input')
		const submitButton = screen.getByTestId('submit-button')

		expect(searchInput).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
	})

	it('should render the header with sidebar button and click to show the sidebar', () => {
		render(
			<NuqsAdapter>
				<MemoryRouter>
					<Layout />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const sidebarMenuButton = screen.getByRole('button', {
			name: /toggle sidebar/i,
		})

		fireEvent.click(sidebarMenuButton)

		const sidebarNavigation = screen.getByTestId('sidebar-navigation')

		expect(sidebarNavigation).toBeInTheDocument()
	})
})
