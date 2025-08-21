import { fireEvent, render, waitFor } from '@testing-library/react'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { Home } from './home'

const mockNavigate = vi.fn()
const mockSetSearchTerm = vi.fn()

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useNavigate: () => mockNavigate,
		useLocation: () => ({ pathname: '/' }),
	}
})

vi.mock('nuqs', () => ({
	useQueryState: vi.fn(() => ['', mockSetSearchTerm]),
}))

describe('<Home />', () => {
	beforeEach(() => {
		mockNavigate.mockClear()
		mockSetSearchTerm.mockClear()
	})

	it('should display an error message when the search term is only numbers', async () => {
		const screen = render(
			<NuqsAdapter>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</NuqsAdapter>
		)
		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 1234 } })

		const submitButton = screen.getByTestId('submit-button')
		fireEvent.click(submitButton)

		const formPlayer = screen.getByTestId('player-form')
		await waitFor(() => formPlayer)

		const errorMessage = screen.getAllByTestId('error-message')

		expect(errorMessage.length).toBe(1)
	})

	it('should show button disabled if the input is empty', () => {
		const screen = render(
			<NuqsAdapter>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: '' } })

		const submitButton = screen.getByTestId('submit-button')

		expect(submitButton).toBeDisabled()
	})

	it('should show button disabled if the input has white spaces', () => {
		const screen = render(
			<NuqsAdapter>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: '    ' } })

		const submitButton = screen.getByTestId('submit-button')

		expect(submitButton).toBeDisabled()
	})

	it('should show button enabled if the input has valid player name', () => {
		const screen = render(
			<NuqsAdapter>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 'Ageonn' } })

		const submitButton = screen.getByTestId('submit-button')
		expect(submitButton).toBeEnabled()
	})

	it('should show button enabled if the input has valid player name and redirect to player summary page', () => {
		const screen = render(
			<NuqsAdapter>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</NuqsAdapter>
		)

		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 'Ageonn' } })

		const submitButton = screen.getByTestId('submit-button')
		expect(submitButton).toBeEnabled()
		fireEvent.click(submitButton)

		expect(mockSetSearchTerm).toHaveBeenCalledWith('Ageonn')

		expect(mockNavigate).toHaveBeenCalledWith('/summary')
	})
})
