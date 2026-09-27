import { defineQuery } from "next-sanity";
const fields = `_id,title,"slug":slug.current,description,thumbnail,category,isFeatured,isLive,scheduledAt,streamLinks,tags,status`;
export const eventsQuery = defineQuery(
  `*[_type == "event"] | order(isLive desc, scheduledAt asc) {${fields}}`,
);
export const eventBySlugQuery = defineQuery(
  `*[_type == "event" && slug.current == $slug][0] {${fields}}`,
);
export const relatedEventsQuery = defineQuery(
  `*[_type == "event" && slug.current != $slug && category == $category][0...4] {${fields}}`,
);
// Prefer the most recently updated settings document. This also keeps older
// projects working if they created settings before singleton enforcement.
export const settingsQuery = defineQuery(
  `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{siteName,subtitle,siteDescription,logo,favicon,ogImage,developerName,developerPortfolio,developerGithub,developerTwitter,footerText}`,
);
