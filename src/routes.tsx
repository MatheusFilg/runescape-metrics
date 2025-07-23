import { createBrowserRouter } from 'react-router'
import { Layout } from './app/layout'
import { Home } from './app/pages/home'
import { PlayerActivity } from './app/pages/player-activity'
import { PlayerExperience } from './app/pages/player-experience'
import { PlayerLevels } from './app/pages/player-levels'
import { PlayerQuests } from './app/pages/player-quests'
import { PlayerSummary } from './app/pages/player-summary'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				path: '/home',
				element: <Home />,
			},
			{
				index: true,
				path: '/summary',
				element: <PlayerSummary />,
			},
			{
				path: '/activity',
				element: <PlayerActivity />,
			},
			{
				path: '/xp',
				element: <PlayerExperience />,
			},
			{
				path: '/levels',
				element: <PlayerLevels />,
			},
			{
				path: '/quests',
				element: <PlayerQuests />,
			},
		],
	},
])
