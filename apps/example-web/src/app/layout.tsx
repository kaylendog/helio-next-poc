"use client";

import { queryClient } from "@/util/query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<QueryClientProvider client={queryClient}>
				<body>{children}</body>
			</QueryClientProvider>
		</html>
	);
}
