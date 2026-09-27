import { defineField, defineType } from "sanity";
export const streamLink = defineType({
  name: "streamLink",
  title: "Stream link",
  type: "object",
  fields: [
    defineField({
      name: "linkName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "m3u8Url",
      title: "HLS (.m3u8) URL",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "isDefault", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "linkName", subtitle: "m3u8Url" } },
});
