import { createBrowserRouter } from "react-router";
import { Activity } from "./app/activity";
import { Layout } from "./app/layout";
import { Summary } from "./app/summary";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				path: "/",
				element: <Summary />,
			},
			{
				path: "/activity",
				element: <Activity />,
			},
		],
	},
]);
