import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { type FormEvent, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function InputSearch() {
	const [inputValue, setInputValue] = useState('')
	const [searchTerm, setSearchTerm] = useQueryState('name', {
		throttleMs: 300,
		defaultValue: '',
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setSearchTerm(inputValue || null)
		setInputValue('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-fit flex flex-row items-center gap-0.5"
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
