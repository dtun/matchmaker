import {
	UserCircle,
	BookOpen,
	FolderKanban,
	Shield,
	Globe,
	TrendingUp,
} from "lucide-react";

let features = [
	{
		name: "You're in the Driver's Seat",
		description:
			"AI assists your matchmaking decisions, never makes them for you",
		icon: UserCircle,
	},
	{
		name: "Smart Note-Taking",
		description:
			"Keep track of friends, family, preferences, and personalities",
		icon: BookOpen,
	},
	{
		name: "Seamless Organization",
		description: "Manage introductions and track feedback in one place",
		icon: FolderKanban,
	},
	{
		name: "Privacy-First",
		description: "Your data is secure with row-level security and encryption",
		icon: Shield,
	},
	{
		name: "Works Anywhere",
		description: "Claude, ChatGPT, or mobile app - use your preferred platform",
		icon: Globe,
	},
	{
		name: "Track Your Success",
		description: "Monitor introduction outcomes and learn what works",
		icon: TrendingUp,
	},
];

export function Features() {
	return (
		<section className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Everything you need to be a great matchmaker
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						AI-assisted tools that help you make meaningful connections while
						keeping you in complete control.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
										<feature.icon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
