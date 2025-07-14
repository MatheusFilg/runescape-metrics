import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function InputSearch() {
	return (
		<div className="w-fit flex flex-row items-center gap-0.5">
			<Button type="submit" variant="outline" className="size-8">
				<Search />
			</Button>
			<Input className="w-44 h-8" placeholder="Search for a Player" />
		</div>
	);
}
