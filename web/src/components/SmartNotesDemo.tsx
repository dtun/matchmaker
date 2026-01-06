import { Terminal } from "lucide-react";

export function SmartNotesDemo() {
	return (
		<section className="bg-gray-50 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Works where you like to work
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Claude Chat, ChatGPT, mobile app (coming soon)
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-4xl">
					{/* Terminal-style demo */}
					<div className="overflow-hidden rounded-lg bg-gray-900 shadow-xl">
						<div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
							<div className="flex gap-1.5">
								<div className="h-3 w-3 rounded-full bg-red-500" />
								<div className="h-3 w-3 rounded-full bg-yellow-500" />
								<div className="h-3 w-3 rounded-full bg-green-500" />
							</div>
							<div className="ml-2 flex items-center gap-2 text-sm text-gray-400">
								<Terminal className="h-4 w-4" />
								<span>The Introduction - Smart Notes</span>
							</div>
						</div>

						<div className="p-6 font-mono text-sm">
							<div className="space-y-4">
								{/* User message */}
								<div>
									<span className="text-green-400">You:</span>
									<span className="ml-2 text-gray-300">
										Add Sarah to my network. She's 28, loves hiking and
										photography, works in tech.
									</span>
								</div>

								{/* AI response */}
								<div>
									<span className="text-sky-400">Assistant:</span>
									<span className="ml-2 text-gray-300">
										I've added Sarah to your network with the details you
										provided. Would you like me to suggest any potential matches
										from your existing connections?
									</span>
								</div>

								{/* User message */}
								<div>
									<span className="text-green-400">You:</span>
									<span className="ml-2 text-gray-300">
										Yes, who might be a good match?
									</span>
								</div>

								{/* AI suggestion */}
								<div>
									<span className="text-sky-400">Assistant:</span>
									<span className="ml-2 text-gray-300">
										Based on your notes, Alex (29, outdoor enthusiast, software
										engineer) shares similar interests with Sarah. They both
										enjoy hiking and work in tech. Would you like to make this
										introduction?
									</span>
								</div>

								{/* Cursor */}
								<div className="flex items-center">
									<span className="text-green-400">You:</span>
									<span className="ml-2 animate-pulse text-gray-300">▊</span>
								</div>
							</div>
						</div>
					</div>

					{/* Emphasis message */}
					<div className="mt-8 text-center">
						<p className="text-lg font-semibold text-gray-900">
							You're in control. AI assists, you decide.
						</p>
					</div>

					{/* How It Works */}
					<div className="mt-16">
						<h3 className="text-center text-2xl font-bold tracking-tight text-gray-900">
							How It Works
						</h3>
						<div className="mt-10 grid gap-8 sm:grid-cols-3">
							<div className="text-center">
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
									<span className="text-xl font-bold">1</span>
								</div>
								<h4 className="mt-4 text-base font-semibold text-gray-900">
									Choose your platform
								</h4>
								<p className="mt-2 text-sm text-gray-600">
									Claude, ChatGPT, or mobile app (coming soon)
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
									<span className="text-xl font-bold">2</span>
								</div>
								<h4 className="mt-4 text-base font-semibold text-gray-900">
									Add people and details
								</h4>
								<p className="mt-2 text-sm text-gray-600">
									Use natural conversation to keep track of friends and family
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
									<span className="text-xl font-bold">3</span>
								</div>
								<h4 className="mt-4 text-base font-semibold text-gray-900">
									Get organized suggestions
								</h4>
								<p className="mt-2 text-sm text-gray-600">
									AI helps you make great matches - you make the final call
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
