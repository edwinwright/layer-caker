"use client";

import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { FAQs } from "@/components/blocks/faqs";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { SplitImage } from "@/components/blocks/split-image";
import { client } from "@/sanity/lib/client";
import type { PAGE_QUERY_RESULT } from "@/sanity/types";

type PageDocument = NonNullable<PAGE_QUERY_RESULT>;
type PageContent = PageDocument["content"];

type PageBuilderProps = {
	content: PageContent;
	documentId: string;
	documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
	projectId,
	dataset,
	baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function PageBuilder({
	content,
	documentId,
	documentType,
}: PageBuilderProps) {
	const blocks = useOptimistic<PageContent | undefined, PageDocument>(
		content,
		(state, action) => {
			if (action.id === documentId) {
				return action.document?.content?.map(
					(block) => state?.find((s) => s._key === block?._key) || block,
				);
			}
			return state;
		},
	);

	if (!Array.isArray(blocks)) {
		return null;
	}

	return (
		<main
			data-sanity={createDataAttribute({
				...createDataAttributeConfig,
				id: documentId,
				type: documentType,
				path: "content",
			}).toString()}
		>
			{blocks.map((block) => {
				const { _key, _type } = block;
				const DragHandle = ({ children }: { children: React.ReactNode }) => (
					<div
						data-sanity={createDataAttribute({
							...createDataAttributeConfig,
							id: documentId,
							type: documentType,
							path: `content[_key=="${_key}"]`,
						}).toString()}
					>
						{children}
					</div>
				);

				switch (_type) {
					case "hero":
						return (
							<DragHandle key={_key}>
								<Hero {...block} />
							</DragHandle>
						);
					case "features":
						return (
							<DragHandle key={_key}>
								<Features {...block} />
							</DragHandle>
						);
					case "splitImage":
						return (
							<DragHandle key={_key}>
								<SplitImage {...block} />
							</DragHandle>
						);
					case "faqs":
						return (
							<DragHandle key={_key}>
								<FAQs {...block} />
							</DragHandle>
						);
					default:
						// This is a fallback for when we don't have a block type
						return <div key={_key}>Block not found: {_type}</div>;
				}
			})}
		</main>
	);
}
