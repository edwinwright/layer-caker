import type { REDIRECTS_QUERY_RESULT } from "@/sanity/types";
import { client } from "./client";
import { REDIRECTS_QUERY } from "./queries";

function isValidRedirect(
	redirect: REDIRECTS_QUERY_RESULT[number],
): redirect is { source: string; destination: string; permanent: boolean } {
	return (
		redirect.source !== null &&
		redirect.destination !== null &&
		redirect.permanent !== null
	);
}
export async function fetchRedirects() {
	const redirects = await client.fetch(REDIRECTS_QUERY);
	return redirects.filter(isValidRedirect);
}
