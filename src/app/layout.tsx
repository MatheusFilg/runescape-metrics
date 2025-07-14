import { Outlet } from "react-router";
import { Header } from "@/components/header";

export function Layout() {
	return (
		<div className="flex flex-col gap-10">
			<Header />
			<Outlet />
		</div>
	);
}
