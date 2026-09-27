import { defineField, defineType } from "sanity";
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "isFeatured", type: "boolean", initialValue: false }),
    defineField({ name: "isLive", type: "boolean", initialValue: false }),
    defineField({
      name: "scheduledAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "streamLinks",
      type: "array",
      of: [{ type: "streamLink" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["live", "upcoming", "ended"], layout: "radio" },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "thumbnail", subtitle: "status" },
  },
});
