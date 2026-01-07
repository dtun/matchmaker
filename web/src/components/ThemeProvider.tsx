"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Check system preference
		let darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

		// Set initial theme based on system preference
		if (darkModeQuery.matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Listen for system preference changes
		let handleChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};

		darkModeQuery.addEventListener("change", handleChange);

		return () => {
			darkModeQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return <>{children}</>;
}
