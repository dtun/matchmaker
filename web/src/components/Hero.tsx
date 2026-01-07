"use client";

import { Button } from "./ui";

export function Hero() {
	let scrollToSection = (id: string) => {
		let element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white py-20 dark:from-gray-900 dark:to-gray-950 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					{/* Brand Logo/Name */}
					<div className="mb-8">
						<h1 className="text-4xl font-bold tracking-tight text-sky-600 dark:text-sky-400 sm:text-5xl">
							The Introduction
						</h1>
					</div>

					{/* Main Headline */}
					<h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
						Smart Notes for Matchmakers
					</h2>

					{/* Subheadline */}
					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
						Empower your matchmaking with AI assistance. Connect friends and
						family where you work - Claude, ChatGPT, or our mobile app (coming
						soon).
					</p>

					{/* CTAs */}
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button
							onClick={() => scrollToSection("waitlist")}
							size="lg"
							variant="primary"
						>
							Join the Waitlist
						</Button>
					</div>
				</div>
			</div>

			{/* Decorative background elements */}
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-sky-400 to-sky-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
		</section>
	);
}
