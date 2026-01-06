import { Hero } from "@/components/Hero";
import { SmartNotesDemo } from "@/components/SmartNotesDemo";
import { Features } from "@/components/Features";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ReferralForm } from "@/components/ReferralForm";
import { Card } from "@/components/ui";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<Hero />

			{/* Smart Notes Demo Section */}
			<SmartNotesDemo />

			{/* Features Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<Features />
				</div>
			</section>

			{/* Dual Waitlist Section */}
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<div className="grid gap-8 md:grid-cols-2">
						{/* Matchmaker Waitlist */}
						<div id="waitlist">
							<Card variant="elevated" className="h-full">
								<div className="p-6">
									<h2 className="text-2xl font-bold text-gray-900">
										Join the Waitlist
									</h2>
									<p className="mt-2 text-gray-600">
										For matchmakers who want to connect friends and family
									</p>
									<div className="mt-6">
										<WaitlistForm />
									</div>
								</div>
							</Card>
						</div>

						{/* Refer a Matchmaker */}
						<div id="referral">
							<Card variant="elevated" className="h-full">
								<div className="p-6">
									<h2 className="text-2xl font-bold text-gray-900">
										Refer a Matchmaker
									</h2>
									<p className="mt-2 text-gray-600">
										Know someone who loves playing matchmaker? Send them an
										invite!
									</p>
									<div className="mt-6">
										<ReferralForm />
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-200 bg-white py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center space-y-4">
						<div className="text-center">
							<h3 className="text-xl font-bold text-gray-900">
								The Introduction
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								Empowering matchmakers with AI-assisted tools
							</p>
						</div>
						<div className="flex space-x-6 text-sm text-gray-500">
							<a href="#" className="transition-colors hover:text-sky-500">
								Privacy Policy
							</a>
							<a href="#" className="transition-colors hover:text-sky-500">
								Terms
							</a>
						</div>
						<p className="text-xs text-gray-400">
							© {new Date().getFullYear()} The Introduction. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</main>
	);
}
