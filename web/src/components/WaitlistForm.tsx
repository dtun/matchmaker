"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, Textarea } from "./ui";
import { waitlistSchema, type WaitlistFormData } from "@/schemas/waitlist";

export function WaitlistForm() {
	let [isSubmitting, setIsSubmitting] = useState(false);
	let [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	let {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<WaitlistFormData>({
		resolver: zodResolver(waitlistSchema),
	});

	let onSubmit = async (data: WaitlistFormData) => {
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			let response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			let result = await response.json();

			if (!response.ok) {
				// Handle specific error cases
				if (response.status === 409) {
					setSubmitStatus({
						type: "error",
						message: "This email is already on the waitlist.",
					});
				} else if (response.status === 400) {
					setSubmitStatus({
						type: "error",
						message: result.error || "Please check your form inputs.",
					});
				} else {
					setSubmitStatus({
						type: "error",
						message: "Something went wrong. Please try again later.",
					});
				}
				return;
			}

			// Success
			setSubmitStatus({
				type: "success",
				message: "Thanks for joining the waitlist! We'll be in touch soon.",
			});
			reset();
		} catch (error) {
			setSubmitStatus({
				type: "error",
				message: "Network error. Please check your connection and try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full">
			<div className="mb-6 text-center">
				<h3 className="text-2xl font-bold text-gray-900">Join the Waitlist</h3>
				<p className="mt-2 text-gray-600">
					For matchmakers who want to connect friends and family
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Email"
					type="email"
					required
					{...register("email")}
					error={errors.email?.message}
					disabled={isSubmitting}
				/>

				<Input
					label="Name"
					type="text"
					required
					{...register("name")}
					error={errors.name?.message}
					disabled={isSubmitting}
				/>

				<Input
					label="Organization"
					type="text"
					{...register("organization")}
					error={errors.organization?.message}
					helperText="Optional - Company or group you match for"
					disabled={isSubmitting}
				/>

				<Input
					label="Phone"
					type="tel"
					{...register("phone")}
					error={errors.phone?.message}
					helperText="Optional"
					disabled={isSubmitting}
				/>

				<Select
					label="How did you hear about us?"
					{...register("how_heard")}
					error={errors.how_heard?.message}
					disabled={isSubmitting}
				>
					<option value="">Select an option</option>
					<option value="search">Search Engine</option>
					<option value="social_media">Social Media</option>
					<option value="friend_referral">Friend Referral</option>
					<option value="blog_article">Blog Article</option>
					<option value="other">Other</option>
				</Select>

				<Textarea
					label="Message"
					{...register("message")}
					error={errors.message?.message}
					helperText="Optional - Tell us about your matchmaking experience"
					disabled={isSubmitting}
				/>

				{submitStatus && (
					<div
						className={`rounded-lg p-4 ${
							submitStatus.type === "success"
								? "bg-green-50 text-green-800"
								: "bg-red-50 text-red-800"
						}`}
					>
						{submitStatus.message}
					</div>
				)}

				<Button
					type="submit"
					variant="primary"
					className="w-full"
					isLoading={isSubmitting}
					disabled={isSubmitting}
				>
					{isSubmitting ? "Joining..." : "Join Waitlist"}
				</Button>
			</form>
		</div>
	);
}
