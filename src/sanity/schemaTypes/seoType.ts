import { defineField, defineType } from "sanity";

export const seoType = defineType({
	name: "seo",
	title: "SEO",
	type: "object",
	fields: [
		defineField({
			name: "title",
			description: "If provided, this will override thetitle field",
			type: "string",
		}),
		defineField({
			name: "description",
			type: "text",
		}),
		defineField({
			name: "image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "alt",
			type: "string",
			description: "The alt text for the image",
		}),
		defineField({
			name: "noIndex",
			type: "boolean",
		}),
	],
});
