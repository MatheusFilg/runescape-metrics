import { createBrowserRouter } from 'react-router'
import { Activity } from './app/activity'
import { Home } from './app/home'
import { Layout } from './app/layout'
import { Summary } from './app/summary'

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
				element: <Summary />,
			},
			{
				path: '/activity',
				element: <Activity />,
			},
		],
	},
])
