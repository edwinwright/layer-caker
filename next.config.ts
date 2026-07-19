import type { NextConfig } from "next";
import { fetchRedirects } from "@/sanity/lib/fetchRedirects";

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	async redirects() {
		return await fetchRedirects();
	},
};

export default nextConfig;
