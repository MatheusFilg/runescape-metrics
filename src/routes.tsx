import { createBrowserRouter } from 'react-router'
import { Layout } from './app/layout'
import { Home } from './app/pages/home/home'
import { PlayerActivity } from './app/pages/player-activity/player-activity-view-model'
import { PlayerExperience } from './app/pages/player-experience/player-experience-view-model'
import { PlayerLevels } from './app/pages/player-levels/player-levels-view-model'
import { PlayerQuests } from './app/pages/player-quests/player-quests'
import { PlayerSummary } from './app/pages/player-summary/player-summary-view-model'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
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
