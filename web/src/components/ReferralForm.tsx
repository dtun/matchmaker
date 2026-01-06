"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "./ui";
import { referralSchema, type ReferralFormData } from "@/schemas/referral";

export function ReferralForm() {
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
	} = useForm<ReferralFormData>({
		resolver: zodResolver(referralSchema),
	});

	let onSubmit = async (data: ReferralFormData) => {
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			let response = await fetch("/api/referral", {
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
						message: "You've already referred this matchmaker.",
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
				message: "Invitation sent! We'll reach out to your matchmaker soon.",
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
				<h3 className="text-2xl font-bold text-gray-900">Refer a Matchmaker</h3>
				<p className="mt-2 text-gray-600">
					Know someone who loves playing matchmaker? Send them an invite!
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Your Name"
					type="text"
					required
					{...register("single_name")}
					error={errors.single_name?.message}
					disabled={isSubmitting}
				/>

				<Input
					label="Your Email"
					type="email"
					required
					{...register("single_email")}
					error={errors.single_email?.message}
					disabled={isSubmitting}
				/>

				<Input
					label="Matchmaker's Name"
					type="text"
					{...register("matchmaker_name")}
					error={errors.matchmaker_name?.message}
					helperText="Optional"
					disabled={isSubmitting}
				/>

				<Input
					label="Matchmaker's Email"
					type="email"
					required
					{...register("matchmaker_email")}
					error={errors.matchmaker_email?.message}
					disabled={isSubmitting}
				/>

				<Textarea
					label="Message"
					{...register("message")}
					error={errors.message?.message}
					helperText="Optional - Why do you think they'd love this?"
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
					{isSubmitting ? "Sending..." : "Send Invitation"}
				</Button>
			</form>
		</div>
	);
}
