import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { categoryType } from "./categoryType";
import { faqType } from "./faqType";
import { pageBuilderType } from "./pageBuilderType";
import { pageType } from "./pageType";
import { postType } from "./postType";
import { redirectType } from "./redirectType";
import { seoType } from "./seoType";
import { siteSettingsType } from "./siteSettingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blockContentType,
		categoryType,
		postType,
		authorType,
		pageType,
		pageBuilderType,
		faqType,
		faqsType,
		featuresType,
		heroType,
		splitImageType,
		siteSettingsType,
		seoType,
		redirectType,
	],
};
