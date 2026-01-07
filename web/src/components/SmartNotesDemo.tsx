import { User, Sparkles, MessageSquare, Users } from "lucide-react";

export function SmartNotesDemo() {
	return (
		<section className="relative bg-gray-100 py-24 sm:py-32 dark:bg-gray-900/95">
			{/* Bokeh burst effects */}
			<div
				className="pointer-events-none absolute left-20 top-20 h-[400px] w-[400px] blur-3xl"
				style={{
					background:
						"radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, rgba(168, 85, 247, 0.4) 30%, transparent 60%)",
					animation: "bokehFloat 22s ease-in-out infinite",
				}}
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute bottom-40 right-20 h-[500px] w-[500px] blur-3xl"
				style={{
					background:
						"radial-gradient(circle, rgba(99, 102, 241, 0.7) 0%, rgba(14, 165, 233, 0.4) 30%, transparent 60%)",
					animation: "bokehFloatSlow 28s ease-in-out infinite",
					animationDelay: "4s",
				}}
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute right-1/3 top-1/2 h-[220px] w-[220px] blur-3xl"
				style={{
					background:
						"radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(99, 102, 241, 0.4) 30%, transparent 60%)",
					animation: "bokehFloat 18s ease-in-out infinite",
					animationDelay: "7s",
				}}
				aria-hidden="true"
			/>

			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
						Natural conversation,
						<br />
						<span className="text-sky-600 dark:text-sky-400">
							powerful results
						</span>
					</h2>
					<p className="mt-6 font-display font-light text-lg leading-8 text-gray-600 dark:text-gray-400">
						Use The Introduction in Claude Chat, ChatGPT, or our mobile app
						(coming soon)
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-5xl">
					{/* Chat-style demo */}
					<div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
						{/* Header */}
						<div className="border-b border-gray-200 bg-gradient-to-r from-sky-50 to-indigo-50 px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
							<div className="flex items-center gap-3">
								<div className="rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 p-2 shadow-lg">
									<Sparkles className="h-5 w-5 text-white" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-gray-100">
										The Introduction
									</h3>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Smart networking assistant
									</p>
								</div>
							</div>
						</div>

						{/* Chat messages */}
						<div className="space-y-6 bg-gray-50 p-6 dark:bg-gray-900/50 sm:p-8">
							{/* User message 1 */}
							<div className="space-y-2">
								<div className="flex items-center justify-end gap-2 text-xs font-medium text-sky-600 dark:text-sky-400">
									<MessageSquare className="h-3.5 w-3.5" />
									<span>Natural language input</span>
								</div>
								<div className="flex items-start justify-end gap-3">
									<div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-sky-500 to-sky-600 px-4 py-3 shadow-md sm:max-w-[75%]">
										<p className="text-sm leading-relaxed text-white sm:text-base">
											Add Sarah to my network. She's 28, loves hiking and
											photography, works in tech.
										</p>
									</div>
									<div className="flex-shrink-0">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/50">
											<User className="h-4 w-4 text-sky-600 dark:text-sky-400" />
										</div>
									</div>
								</div>
							</div>

							{/* AI response 1 */}
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
									<Sparkles className="h-3.5 w-3.5" />
									<span>AI understands context</span>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
											<Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
										</div>
									</div>
									<div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md dark:bg-gray-800 sm:max-w-[75%]">
										<p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100 sm:text-base">
											I've added Sarah to your network with the details you
											provided. Would you like me to suggest any potential
											matches from your existing connections?
										</p>
									</div>
								</div>
							</div>

							{/* User message 2 */}
							<div className="flex items-start justify-end gap-3">
								<div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-sky-500 to-sky-600 px-4 py-3 shadow-md sm:max-w-[75%]">
									<p className="text-sm leading-relaxed text-white sm:text-base">
										Yes, who might be a good match?
									</p>
								</div>
								<div className="flex-shrink-0">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/50">
										<User className="h-4 w-4 text-sky-600 dark:text-sky-400" />
									</div>
								</div>
							</div>

							{/* AI suggestion */}
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-xs font-medium text-purple-600 dark:text-purple-400">
									<Users className="h-3.5 w-3.5" />
									<span>Smart matching</span>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
											<Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
										</div>
									</div>
									<div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md dark:bg-gray-800 sm:max-w-[75%]">
										<p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100 sm:text-base">
											Based on your notes, Alex (29, outdoor enthusiast,
											software engineer) shares similar interests with Sarah.
											They both enjoy hiking and work in tech. Would you like
											to make this introduction?
										</p>
									</div>
								</div>
							</div>

							{/* Typing indicator */}
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/50">
										<User className="h-4 w-4 text-sky-600 dark:text-sky-400" />
									</div>
								</div>
								<div className="flex items-center space-x-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md dark:bg-gray-800">
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
								</div>
							</div>
						</div>
					</div>

					{/* How It Works */}
					<div className="mt-20">
						<h3 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
							How It Works
						</h3>
						<div className="mt-12 grid gap-10 sm:grid-cols-3">
							<div className="group text-center">
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
									<span className="text-2xl font-bold">1</span>
								</div>
								<h4 className="mt-6 text-lg font-bold text-gray-900 dark:text-gray-100">
									Choose your platform
								</h4>
								<p className="mt-3 font-display font-normal text-base text-gray-600 dark:text-gray-400">
									Claude, ChatGPT, or mobile app (coming soon)
								</p>
							</div>
							<div className="group text-center">
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
									<span className="text-2xl font-bold">2</span>
								</div>
								<h4 className="mt-6 text-lg font-bold text-gray-900 dark:text-gray-100">
									Add people and details
								</h4>
								<p className="mt-3 font-display font-normal text-base text-gray-600 dark:text-gray-400">
									Use natural conversation to keep track of friends and family
								</p>
							</div>
							<div className="group text-center">
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
									<span className="text-2xl font-bold">3</span>
								</div>
								<h4 className="mt-6 text-lg font-bold text-gray-900 dark:text-gray-100">
									Get smart suggestions
								</h4>
								<p className="mt-3 font-display font-normal text-base text-gray-600 dark:text-gray-400">
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
