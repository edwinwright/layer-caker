import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/components/post";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

export async function generateStaticParams() {
	const slugs = await client
		.withConfig({ useCdn: false })
		.fetch(POSTS_SLUGS_QUERY);
	return slugs;
}

type RouteProps = {
	params: Promise<{ slug: string }>;
};

const getPost = async (params: RouteProps["params"]) => {
	const { slug } = await params;
	const { data } = await sanityFetch({
		query: POST_QUERY,
		params: { slug },
		tags: [`post:${slug}`, "author", "category"],
	});
	return data;
};

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const post = await getPost(params);

	if (!post) return {};

	const metadata: Metadata = {
		title: post.seo.title,
		description: post.seo.description,
	};

	metadata.openGraph = {
		images: {
			url: post.seo.image
				? urlFor(post.seo.image).width(1200).height(630).url()
				: `/api/og?id=${post._id}`,
			width: 1200,
			height: 630,
		},
	};

	if (post.seo.noIndex) {
		metadata.robots = "noindex";
	}

	return metadata;
}

export default async function Page({ params }: RouteProps) {
	const post = await getPost(params);

	if (!post) notFound();

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<Post {...post} />
		</main>
	);
}
