"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "./ui";
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
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Name"
					type="text"
					required
					{...register("name")}
					error={errors.name?.message}
					disabled={isSubmitting}
				/>

				<Input
					label="Email"
					type="email"
					required
					{...register("email")}
					error={errors.email?.message}
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
