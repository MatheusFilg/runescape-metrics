interface CardInfoLevelsProps {
	text: string
	info: string
}

export const CardInfoLevels = ({ text, info }: CardInfoLevelsProps) => {
	return (
		<div className="bg-sidebar-accent place-items-center justify-center flex flex-col gap-2 px-4 py-2 rounded w-full h-24">
			<span className="text-sm capitalize">{text}</span>
			<h1 className="text-4xl font-bold">{info}</h1>
		</div>
	)
}
