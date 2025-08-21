import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { type FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function InputSearch() {
	const location = useLocation()
	const navigate = useNavigate()

	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState('')
	const [searchTerm, setSearchTerm] = useQueryState('name', {
		defaultValue: '',
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const onlyNumbersRegex = /^\d+$/
		if (onlyNumbersRegex.test(inputValue.trim())) {
			setError('Only numbers are not allowed')
			return
		}

		if (error) setError('')

		e.preventDefault()
		setSearchTerm(inputValue || null)
		setInputValue('')
		if (location.pathname === '/') {
			navigate('/summary')
		}
	}

	return (
		<div className="flex flex-col">
			<form
				onSubmit={handleSubmit}
				data-testid="player-form"
				className="w-fit flex flex-row items-center gap-1"
			>
				<Button
					type="submit"
					variant="outline"
					data-testid="submit-button"
					className="size-9"
					disabled={!inputValue.trim()}
				>
					<Search />
				</Button>
				<Input
					type="text"
					placeholder="Search for a Player"
					data-testid="search-input"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
			</form>
			{error && (
				<p
					className="text-destructive text-sm ml-10"
					data-testid="error-message"
				>
					{error}
				</p>
			)}
		</div>
	)
}
