import { defineField, defineType } from "sanity";
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description:
        "Used in the landing-page browser title: Site name | Subtitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "siteDescription", type: "text" }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description:
        "Square site icon. Use at least 512 × 512 px; PNG is recommended.",
      type: "image",
      options: { accept: "image/png,image/jpeg,image/webp,image/svg+xml" },
    }),
    defineField({ name: "ogImage", type: "image" }),
    defineField({ name: "developerName", type: "string" }),
    defineField({ name: "developerPortfolio", type: "url" }),
    defineField({ name: "developerGithub", type: "url" }),
    defineField({ name: "developerTwitter", type: "url" }),
    defineField({ name: "footerText", type: "string" }),
  ],
});
