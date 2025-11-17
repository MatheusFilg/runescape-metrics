import { Volume2, VolumeOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { InputSearch } from './input-search'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'

export function Header() {
	const location = useLocation()

	const audioRef = useRef<HTMLAudioElement | null>(null)

	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		const audio = new Audio('./src/public/runescape-theme.mp3')
		audio.loop = true
		audioRef.current = audio

		const handlePlay = () => setIsPlaying(true)
		const handlePause = () => setIsPlaying(false)

		audio.addEventListener('play', handlePlay)
		audio.addEventListener('pause', handlePause)

		return () => {
			audio.pause()
			audio.removeEventListener('play', handlePlay)
			audio.removeEventListener('pause', handlePause)
		}
	}, [])

	function handleToggleSound() {
		if (!audioRef.current) {
			return
		}
		console.log(isPlaying)
		console.log(audioRef.current)
		if (isPlaying) {
			audioRef.current.pause()
		}
		if (!isPlaying) {
			audioRef.current.play().catch((err: Error) => {
				console.warn('O áudio não pôde ser iniciado automaticamente.', err)
			})
		}
	}

	return (
		<div className="w-full flex flex-row justify-between items-center border-b border-2 h-fit px-4 py-2">
			<SidebarTrigger />
			<div className="flex flex-row gap-4">
				<div className={`${location.pathname === '/' ? 'hidden' : 'flex'}`}>
					<InputSearch />
				</div>
				<Button variant="outline" onClick={handleToggleSound}>
					{isPlaying ? <Volume2 /> : <VolumeOff />}
				</Button>
				<ThemeToggle />
			</div>
		</div>
	)
}
