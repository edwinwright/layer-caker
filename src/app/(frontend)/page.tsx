// import type { Metadata } from "next";
import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

const getPage = async () =>
	sanityFetch({
		query: HOME_PAGE_QUERY,
	});

// export async function generateMetadata(): Promise<Metadata> {
// 	const { data: page } = await getPage();

// 	return {
// 		title: page?.homePage?.seo.title,
// 	};
// }

export default async function Page() {
	const { data: page } = await getPage();

	return page?.homePage?.content ? (
		<PageBuilder
			documentId={page.homePage._id}
			documentType={page.homePage._type}
			content={page.homePage.content}
		/>
	) : null;
}
