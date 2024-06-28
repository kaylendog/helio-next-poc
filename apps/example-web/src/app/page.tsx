"use client";

import { useFetchPartyQuery } from "@/services/party";

export default function Home() {
	const { data: party, isLoading: isPartyLoading, error: partyError } = useFetchPartyQuery();

	if (isPartyLoading) {
		return <div>Loading...</div>;
	}

	if (partyError) {
		return <div>Error: {partyError.message}</div>;
	}

	return (
		<div>
			<h1>Example Web</h1>
			<p>Welcome to the Example Web app.</p>
			{/* the backend doesn't export types. */}
			<p>Party name: {party as any}</p>
		</div>
	);
}
