import dayjs from "dayjs";
import type { POST_QUERY_RESULT } from "@/sanity/types";

type PublishedAtProps = {
	publishedAt: NonNullable<POST_QUERY_RESULT>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
	return publishedAt ? (
		<p className="text-base text-slate-700">
			{dayjs(publishedAt).format("D MMMM YYYY")}
		</p>
	) : null;
}
