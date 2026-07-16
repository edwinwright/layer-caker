import Link from "next/link";
import { PostCard } from "@/components/post-card";
// import { sanityFetch } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export default async function Page() {
	// const { data: posts } = await sanityFetch({ query: POSTS_QUERY });
	const posts = await sanityFetch({ query: POSTS_QUERY, revalidate: 3600 });

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<h1 className="text-4xl font-bold">Post index</h1>
			<ul className="grid grid-cols-1 divide-y divide-blue-100">
				{posts.map((post) => (
					<li key={post._id} className="py-4">
						<PostCard {...post} />
					</li>
				))}
			</ul>
			<hr />
			<Link href="/">&larr; Return home</Link>
		</main>
	);
}
