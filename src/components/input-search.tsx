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
	const [searchTerm, setSearchTerm] = useQueryState('name', {
		defaultValue: '',
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setSearchTerm(inputValue || null)
		setInputValue('')
		if (location.pathname === '/') {
			navigate('/summary')
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-fit flex flex-row items-center gap-1"
		>
			<Button
				type="submit"
				variant="outline"
				className="size-9"
				disabled={!inputValue.trim()}
			>
				<Search />
			</Button>
			<Input
				placeholder="Search for a Player"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
		</form>
	)
}
