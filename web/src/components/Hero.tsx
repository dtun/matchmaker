"use client";

import {
	User,
	Sparkles,
	MessageSquare,
	Heart,
	Cloud,
	Check,
} from "lucide-react";
import { Button } from "./ui";

export function Hero() {
	let scrollToSection = (id: string) => {
		let element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section className="relative overflow-hidden bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					{/* Main Headline */}
					<h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-gray-100">
						<span className="text-sky-600 dark:text-sky-400">Supercharge</span>{" "}
						your matchmaking
					</h1>

					{/* Subheadline */}
					<p className="font-display mt-8 text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
						AI-powered smart notes that help you connect friends and family with
						confidence. Work in Claude, ChatGPT, or our mobile app.
					</p>

					{/* CTAs */}
					<div className="mt-12 flex items-center justify-center gap-x-6">
						<Button
							onClick={() => scrollToSection("waitlist")}
							size="lg"
							variant="primary"
						>
							Join the Waitlist
						</Button>
					</div>
				</div>

				{/* Chat Demo */}
				<div className="mx-auto mt-20 max-w-5xl">
					<div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
						{/* Header */}
						<div className="border-b border-gray-200 bg-gradient-to-r from-sky-50 to-indigo-50 px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
							<div className="flex items-center gap-3">
								<div className="rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 p-2 shadow-lg">
									<Check className="h-5 w-5 text-white" />
								</div>
								<div>
									<h2 className="font-semibold text-gray-900 dark:text-gray-100">
										Matchmkr Pro
									</h2>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										by The Introduction
									</p>
								</div>
							</div>
						</div>

						{/* Chat messages */}
						<div className="space-y-6 bg-gray-50 p-6 sm:p-8 dark:bg-gray-900/50">
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
									<Cloud className="h-3.5 w-3.5" />
									<span>AI understands context</span>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
											<Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
										</div>
									</div>
									<div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md sm:max-w-[75%] dark:bg-gray-800">
										<p className="text-sm leading-relaxed text-gray-900 sm:text-base dark:text-gray-100">
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
									<Heart className="h-3.5 w-3.5" />
									<span>Smart matching</span>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
											<Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
										</div>
									</div>
									<div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md sm:max-w-[75%] dark:bg-gray-800">
										<p className="text-sm leading-relaxed text-gray-900 sm:text-base dark:text-gray-100">
											Based on your notes, Alex (29, outdoor enthusiast,
											software engineer) shares similar interests with Sarah.
											They both enjoy hiking and work in tech. Would you like to
											make this introduction?
										</p>
									</div>
								</div>
							</div>

							{/* Typing indicator */}
							<div className="flex justify-end gap-3">
								<div className="flex items-center space-x-1 rounded-2xl rounded-tr-sm bg-white px-4 py-3 shadow-md dark:bg-gray-800">
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
									<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
								</div>
								<div className="flex-shrink-0">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/50">
										<User className="h-4 w-4 text-sky-600 dark:text-sky-400" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Decorative background elements */}
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-400 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-10"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-400 to-sky-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-10"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>

			{/* Bokeh burst effects */}
			<div
				className="pointer-events-none absolute right-10 top-20 h-[400px] w-[400px] opacity-[0.2] blur-3xl sm:h-[500px] sm:w-[500px] sm:opacity-[0.25]"
				style={{
					background:
						"radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, rgba(99, 102, 241, 0.3) 25%, rgba(168, 85, 247, 0.15) 40%, transparent 65%)",
					animation: "bokehFloat 20s ease-in-out infinite",
				}}
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute left-20 top-1/3 h-[350px] w-[350px] opacity-[0.18] blur-3xl sm:h-[400px] sm:w-[400px] sm:opacity-[0.23]"
				style={{
					background:
						"radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, rgba(14, 165, 233, 0.3) 25%, rgba(168, 85, 247, 0.15) 40%, transparent 65%)",
					animation: "bokehFloatSlow 25s ease-in-out infinite",
					animationDelay: "5s",
				}}
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute bottom-32 right-1/3 h-[250px] w-[250px] opacity-[0.19] blur-3xl sm:h-[280px] sm:w-[280px] sm:opacity-[0.24]"
				style={{
					background:
						"radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(99, 102, 241, 0.3) 25%, rgba(14, 165, 233, 0.15) 40%, transparent 65%)",
					animation: "bokehFloat 18s ease-in-out infinite",
					animationDelay: "2s",
				}}
				aria-hidden="true"
			/>
		</section>
	);
}
