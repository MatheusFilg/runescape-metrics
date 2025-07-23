import { InputSearch } from '@/components/input-search'

export function Home() {
	return (
		<div className="flex-1 h-screen p-2">
			<div className="flex flex-col items-center gap-16 w-full h-full">
				<div className="w-full flex flex-col items-center">
					<h1 className="font-bold text-xl">Welcome</h1>
					<h2>
						A project who use the api from runemetrics, but with a new design
						and features.
					</h2>
					<span className="italic text-muted-foreground">Hope u enjoy</span>
				</div>

				<div className="flex flex-col items-center gap-2">
					<h1 className="font-bold text-xl">Important:</h1>
					<h2 className="font-bold">
						Before search make sure the player has public profile
					</h2>
					<h2 className="mb-16 font-bold">
						The names of player are case-sensitivity, pay attention to search a
						name
					</h2>
				</div>
				<div className="flex flex-col items-center gap-2">
					<h2>To start, just search for a player name in the field below.</h2>

					<InputSearch />

					<span className="text-sm text-muted-foreground italic">
						Example: Ageonn{' '}
					</span>
				</div>
			</div>
		</div>
	)
}
