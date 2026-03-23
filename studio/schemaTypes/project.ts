import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Display Title",
      description: "Title as shown in the list (e.g. all caps or stylized)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "E.g. Illustration, Etching, Illustration & Publishing",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleStyle",
      title: "Title Style",
      type: "string",
      options: {
        list: [
          { title: "Uppercase", value: "uppercase" },
          { title: "Italic", value: "italic" },
          { title: "Normal", value: "normal" },
        ],
        layout: "radio",
      },
      initialValue: "normal",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "src",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "title",
              title: "Image Title",
              type: "string",
            }),
            defineField({
              name: "medium",
              title: "Medium / Technique",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", media: "src" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower number = appears first in the list",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "thumbnail",
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
